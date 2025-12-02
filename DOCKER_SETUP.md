# 🐳 Docker Setup Guide - LMS3 Project
# Docker सेटअप गाइड - LMS3 प्रोजेक्ट

Complete guide to run the LMS3 Learning Management System using Docker.

---

## 📋 Prerequisites / आवश्यक चीजें

### Install Docker Desktop / Docker Desktop इंस्टॉल करें

1. **Windows के लिए:**
   - [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) डाउनलोड करें
   - Installer चलाएं और instructions follow करें
   - Installation के बाद system restart करें
   - Docker Desktop खोलें और सुनिश्चित करें कि यह चल रहा है

2. **Verify Installation / इंस्टॉलेशन वेरीफाई करें:**
   ```powershell
   docker --version
   docker-compose --version
   ```
   
   दोनों commands version number दिखाने चाहिए।

---

## 🚀 Quick Start / तुरंत शुरू करें

### Method 1: Using Docker Compose (Recommended) / Docker Compose का उपयोग (अनुशंसित)

1. **Project directory में जाएं:**
   ```powershell
   cd c:\Users\aditya\OneDrive\Desktop\LMS3
   ```

2. **सभी services build करें:**
   ```powershell
   docker-compose build
   ```
   
   ⏱️ यह पहली बार 5-10 मिनट ले सकता है।

3. **सभी services start करें:**
   ```powershell
   docker-compose up -d
   ```
   
   `-d` flag background में run करता है।

4. **Application खोलें:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000
   - **MongoDB:** localhost:27017

5. **Logs देखें:**
   ```powershell
   # सभी services के logs
   docker-compose logs -f
   
   # किसी specific service के logs
   docker-compose logs -f backend
   docker-compose logs -f frontend
   docker-compose logs -f mongodb
   ```

6. **Services बंद करें:**
   ```powershell
   # Services रोकें (data बचाएं)
   docker-compose stop
   
   # Services रोकें और containers हटाएं (data बचाएं)
   docker-compose down
   
   # सब कुछ हटाएं (data भी)
   docker-compose down -v
   ```

---

## 🔧 Individual Services / अलग-अलग Services

### Backend Only / सिर्फ Backend

```powershell
cd backend
docker build -t lms-backend .
docker run -p 5000:5000 --env-file ../.env.docker lms-backend
```

### Frontend Only / सिर्फ Frontend

```powershell
cd frontend
docker build -t lms-frontend .
docker run -p 3000:80 lms-frontend
```

---

## 🔐 Environment Variables / एनवायरनमेंट वेरिएबल्स

`.env.docker` file को `.env` के रूप में copy करें और values update करें:

```bash
# JWT Secret (IMPORTANT: Production में change करें!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MongoDB Connection
MONGODB_URI=mongodb://mongodb:27017/lms

# Backend Port
PORT=5000
```

---

## 📊 Useful Docker Commands / उपयोगी Docker Commands

### Container Management / Container प्रबंधन

```powershell
# सभी running containers देखें
docker ps

# सभी containers देखें (stopped भी)
docker ps -a

# Container के अंदर जाएं
docker exec -it lms-backend sh
docker exec -it lms-mongodb mongosh

# Container restart करें
docker restart lms-backend
```

### Image Management / Image प्रबंधन

```powershell
# सभी images देखें
docker images

# Image हटाएं
docker rmi lms-backend

# Unused images साफ करें
docker image prune
```

### Volume Management / Volume प्रबंधन

```powershell
# सभी volumes देखें
docker volume ls

# Volume inspect करें
docker volume inspect lms3_mongodb_data

# Unused volumes हटाएं
docker volume prune
```

### Network Management / Network प्रबंधन

```powershell
# सभी networks देखें
docker network ls

# Network inspect करें
docker network inspect lms3_lms-network
```

---

## 🛠️ Troubleshooting / समस्या समाधान

### Problem: Port already in use / पोर्ट पहले से उपयोग में है

**Solution:**
```powershell
# कौन सी process port use कर रही है देखें
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Process को kill करें (PID से)
taskkill /PID <PID> /F
```

या docker-compose.yml में ports बदलें:
```yaml
ports:
  - "5001:5000"  # Host:Container
```

### Problem: MongoDB connection failed / MongoDB कनेक्शन फेल

**Solution:**
```powershell
# MongoDB container logs देखें
docker-compose logs mongodb

# MongoDB health check करें
docker exec -it lms-mongodb mongosh --eval "db.adminCommand('ping')"

# Services restart करें
docker-compose restart
```

### Problem: Frontend shows blank page / Frontend खाली पेज दिखाता है

**Solution:**
```powershell
# Frontend rebuild करें
docker-compose build --no-cache frontend
docker-compose up -d frontend

# Nginx logs देखें
docker-compose logs frontend
```

### Problem: Changes not reflecting / बदलाव नहीं दिख रहे

**Solution:**
```powershell
# Rebuild without cache
docker-compose build --no-cache

# Remove old containers and start fresh
docker-compose down
docker-compose up -d --force-recreate
```

### Problem: Out of disk space / Disk space खत्म

**Solution:**
```powershell
# सब कुछ साफ करें (सावधान: सभी Docker data हटेगा!)
docker system prune -a --volumes

# सिर्फ unused resources साफ करें
docker system prune
```

---

## 🔄 Development Workflow / Development वर्कफ्लो

### Code में changes के बाद:

1. **Backend changes:**
   ```powershell
   docker-compose build backend
   docker-compose up -d backend
   ```

2. **Frontend changes:**
   ```powershell
   docker-compose build frontend
   docker-compose up -d frontend
   ```

3. **दोनों में changes:**
   ```powershell
   docker-compose build
   docker-compose up -d
   ```

---

## 📦 Production Deployment / Production डिप्लॉयमेंट

### Production के लिए tips:

1. **Strong JWT secret use करें:**
   ```bash
   # Random secret generate करें
   openssl rand -base64 32
   ```

2. **Environment variables secure रखें:**
   - `.env` file को `.gitignore` में add करें
   - Production में environment variables use करें

3. **Health checks enable करें:**
   - Docker compose में already configured हैं
   - Monitoring tools के साथ integrate करें

4. **Logs manage करें:**
   ```powershell
   # Log size limit करें
   docker-compose logs --tail=100 -f
   ```

5. **Regular backups लें:**
   ```powershell
   # MongoDB data backup
   docker exec lms-mongodb mongodump --out /backup
   docker cp lms-mongodb:/backup ./mongodb-backup
   ```

---

## 📚 Architecture / आर्किटेक्चर

```
┌─────────────────────────────────────────────────┐
│                   Docker Host                    │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────┐│
│  │   Frontend   │  │   Backend    │  │MongoDB ││
│  │  (nginx:80)  │◄─┤ (node:5000)  │◄─┤ :27017 ││
│  └──────────────┘  └──────────────┘  └────────┘│
│         │                                        │
│         │                                        │
└─────────┼────────────────────────────────────────┘
          │
          ▼
    localhost:3000
```

- **Frontend:** React + Vite app served by nginx
- **Backend:** Express.js API server
- **MongoDB:** Database with persistent volume
- **Network:** All services connected via `lms-network`

---

## ✅ Verification / वेरिफिकेशन

### सब कुछ सही चल रहा है check करें:

```powershell
# 1. सभी containers running हैं
docker-compose ps

# 2. Backend API test करें
curl http://localhost:5000

# 3. Frontend खोलें
start http://localhost:3000

# 4. MongoDB connection test करें
docker exec -it lms-mongodb mongosh --eval "db.adminCommand('ping')"
```

---

## 🆘 Support / सहायता

अगर कोई समस्या आए:

1. Logs check करें: `docker-compose logs -f`
2. Containers status देखें: `docker-compose ps`
3. Services restart करें: `docker-compose restart`
4. Fresh start करें: `docker-compose down && docker-compose up -d`

---

## 📝 Notes / नोट्स

- पहली बार build करने में समय लगेगा (dependencies download)
- MongoDB data `mongodb_data` volume में persist होता है
- Development के लिए, आप local में भी run कर सकते हैं (बिना Docker)
- Production में हमेशा strong secrets और environment variables use करें

---

**Happy Coding! 🚀**
