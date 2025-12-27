// ADMIN FIX - Run this in Browser Console (F12)
// Copy and paste ALL of this code in the browser console and press Enter

// Clear old data and create fresh admin user
const defaultUsers = [
    {
        id: 'admin_001',
        name: 'Admin User',
        email: 'admin@vspelectronics.com',
        phone: '9999999999',
        role: 'admin',
        password: 'Admin@123',
        createdAt: new Date().toISOString()
    },
    {
        id: 'test_001',
        name: 'Test User',
        email: 'test@gmail.com',
        phone: '9876543210',
        role: 'user',
        password: 'Test@123',
        createdAt: new Date().toISOString()
    }
];

localStorage.setItem('drone_shop_users', JSON.stringify(defaultUsers));
localStorage.removeItem('drone_shop_current_user');

console.log('✅ Admin user created successfully!');
console.log('Email: admin@vspelectronics.com');
console.log('Password: Admin@123');
console.log('\nNow refresh the page and login!');

// Display all users
const users = JSON.parse(localStorage.getItem('drone_shop_users'));
console.table(users);
