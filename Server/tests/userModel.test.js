import db from '../config/db.js';
import User from '../modules/user.js';

describe('User Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a user with valid data', async () => {
    const userData = {
      fullname: 'Jane Doe',
      email: 'jane@example.com',
      password: 'hashedpassword123'
    };

    const user = await User.create(userData);
    
    expect(user.fullname).toBe('Jane Doe');
    expect(user.email).toBe('jane@example.com');
    expect(user.password).toBe('hashedpassword123');
    expect(user.isVerified).toBe(false);
    expect(user.id).toBeDefined();
  });

  it('should not create user with duplicate email', async () => {
    const userData = {
      fullname: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    await User.create(userData);

    try {
      await User.create({
        fullname: 'Jane Doe',
        email: 'john@example.com', // Same email
        password: 'password456'
      });
      fail('Should have thrown an error for duplicate email');
    } catch (error) {
      expect(error.name).toBe('SequelizeUniqueConstraintError');
    }
  });

  it('should not create user with missing required fields', async () => {
    try {
      await User.create({
        fullname: 'John Doe'
        // Missing email and password
      });
      fail('Should have thrown an error for missing required fields');
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('should find user by email', async () => {
    const userData = {
      fullname: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    await User.create(userData);
    const foundUser = await User.findOne({ where: { email: 'test@example.com' } });

    expect(foundUser).toBeDefined();
    expect(foundUser.fullname).toBe('Test User');
    expect(foundUser.email).toBe('test@example.com');
  });

  it('should update user verification status', async () => {
    const user = await User.create({
      fullname: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      isVerified: false
    });

    await User.update(
      { isVerified: true },
      { where: { email: 'test@example.com' } }
    );

    const updatedUser = await User.findOne({ where: { email: 'test@example.com' } });
    expect(updatedUser.isVerified).toBe(true);
  });

  it('should handle OTP and expiry fields', async () => {
    const user = await User.create({
      fullname: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      otp: '123456',
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    });

    expect(user.otp).toBe('123456');
    expect(user.otpExpiry).toBeInstanceOf(Date);
  });

  it('should set default isVerified to false', async () => {
    const user = await User.create({
      fullname: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(user.isVerified).toBe(false);
  });

  it('should allow null OTP and expiry fields', async () => {
    const user = await User.create({
      fullname: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      otp: null,
      otpExpiry: null
    });

    expect(user.otp).toBeNull();
    expect(user.otpExpiry).toBeNull();
  });
}); 