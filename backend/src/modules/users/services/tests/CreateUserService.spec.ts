import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should create a new User', async () => {
    const user = await createUser.execute({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create an user with a duplicated email', async () => {
    const userEmail = 'youssef@gmail.com';

    await createUser.execute({
      name: 'Youssef',
      email: userEmail,
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Muhamad',
        email: userEmail,
        password: 'batata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
