import AuthBtn from 'components/AuthBtn/AuthBtn';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLogin } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';
import { Form, Input, ShowPassword, Svg } from './LoginForm.styled';
import { useState } from 'react';
import sprite from '../../assets/sprite.svg';
import { getAllBoards } from 'redux/allBoards/operations';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(
        '^([A-Za-z0-9_-]+.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$',
        'Invalid email format'
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(8)
      .max(64)
      .matches(
        /^[A-Za-z0-9!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~`]+$/,
        'Invalid password format'
      ),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = data => {
    dispatch(userLogin(data));   
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <Input placeholder="Enter your email" {...register('email')} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
          <div>
            <Input
              type={passwordShown ? 'text' : 'password'}
              placeholder="Confirm a password"
              {...register('password')}
            />
            <ShowPassword onClick={togglePasswordVisiblity}>
              <Svg width="20px" height="20px">
                <use href={sprite + '#eye'}></use>
              </Svg>
            </ShowPassword>
          </div>

          <p>{errors.password?.message}</p>
        </label>
        <AuthBtn textBtn="Log In Now" />
      </Form>
    </>
  );
};

export default LoginForm;
