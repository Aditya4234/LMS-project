const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Student = require('./models/Student');
const Instructor = require('./models/Instructor');
const Announcement = require('./models/Announcement');

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/lms';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional)
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Instructor.deleteMany({});
    await Announcement.deleteMany({});

    // Create sample users
    console.log('👥 Creating users...');
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@lms.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@student.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Jane Smith',
        email: 'jane@student.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Dr. Robert Johnson',
        email: 'robert@teacher.com',
        password: 'teacher123',
        role: 'teacher'
      },
      {
        name: 'Prof. Sarah Williams',
        email: 'sarah@teacher.com',
        password: 'teacher123',
        role: 'teacher'
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create sample courses
    console.log('📚 Creating courses...');
    const courses = await Course.create([
      {
        title: 'Introduction to Web Development',
        description: 'Learn HTML, CSS, and JavaScript basics',
        instructor: 'Dr. Robert Johnson',
        duration: '12 weeks',
        price: 4999,
        level: 'Beginner',
        studentsEnrolled: 45,
        rating: 4.5
      },
      {
        title: 'Advanced React & Node.js',
        description: 'Build full-stack applications with React and Node.js',
        instructor: 'Prof. Sarah Williams',
        duration: '16 weeks',
        price: 7999,
        level: 'Advanced',
        studentsEnrolled: 32,
        rating: 4.8
      },
      {
        title: 'Database Design & MongoDB',
        description: 'Master database design principles and MongoDB',
        instructor: 'Dr. Robert Johnson',
        duration: '10 weeks',
        price: 5999,
        level: 'Intermediate',
        studentsEnrolled: 28,
        rating: 4.6
      },
      {
        title: 'Python for Data Science',
        description: 'Learn Python programming for data analysis',
        instructor: 'Prof. Sarah Williams',
        duration: '14 weeks',
        price: 6999,
        level: 'Intermediate',
        studentsEnrolled: 38,
        rating: 4.7
      }
    ]);
    console.log(`✅ Created ${courses.length} courses`);

    // Create sample students
    console.log('🎓 Creating students...');
    const students = await Student.create([
      {
        name: 'John Doe',
        email: 'john@student.com',
        phone: '+1234567890',
        enrolled: 'Introduction to Web Development',
        status: 'Active'
      },
      {
        name: 'Jane Smith',
        email: 'jane@student.com',
        phone: '+1234567891',
        enrolled: 'Advanced React & Node.js',
        status: 'Active'
      },
      {
        name: 'Mike Brown',
        email: 'mike@student.com',
        phone: '+1234567892',
        enrolled: 'Database Design & MongoDB',
        status: 'Active'
      },
      {
        name: 'Emily Davis',
        email: 'emily@student.com',
        phone: '+1234567893',
        enrolled: 'Python for Data Science',
        status: 'Pending'
      }
    ]);
    console.log(`✅ Created ${students.length} students`);

    // Create sample instructors
    console.log('👨‍🏫 Creating instructors...');
    const instructors = await Instructor.create([
      {
        name: 'Dr. Robert Johnson',
        email: 'robert@teacher.com',
        subject: 'Web Development & Databases',
        bio: 'Experienced professor with 10+ years in teaching web technologies',
        rating: 4.8
      },
      {
        name: 'Prof. Sarah Williams',
        email: 'sarah@teacher.com',
        subject: 'Software Engineering & Data Science',
        bio: 'Passionate educator specializing in modern software development',
        rating: 4.9
      }
    ]);
    console.log(`✅ Created ${instructors.length} instructors`);

    // Create sample announcements
    console.log('📢 Creating announcements...');
    const announcements = await Announcement.create([
      {
        title: 'Welcome to LMS3!',
        content: 'Welcome to our new Learning Management System. We hope you have a great learning experience!',
        date: new Date(),
        author: 'Admin User'
      },
      {
        title: 'New Course Available',
        content: 'Check out our new course on Advanced React & Node.js. Enrollment is now open!',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        author: 'Admin User'
      },
      {
        title: 'Exam Schedule Released',
        content: 'The final exam schedule has been released. Please check your course pages for details.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        author: 'Admin User'
      }
    ]);
    console.log(`✅ Created ${announcements.length} announcements`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Courses: ${courses.length}`);
    console.log(`   - Students: ${students.length}`);
    console.log(`   - Instructors: ${instructors.length}`);
    console.log(`   - Announcements: ${announcements.length}`);
    console.log('\n✅ You can now view this data in the admin panel at http://localhost:5000/admin.html');
    console.log('\n🔐 Login credentials:');
    console.log('   Admin: admin@lms.com / admin123');
    console.log('   Student: john@student.com / student123');
    console.log('   Teacher: robert@teacher.com / teacher123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

