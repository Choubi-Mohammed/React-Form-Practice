import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = () => {
  const validationSchema = Yup.object({
    Email: Yup.string().email('Please enter a valid email').required('Email is required'),
    Password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });

  const { register, handleSubmit, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      Email: '',
      Password: ''
    }
  });

  const { errors, isSubmitted, isValid } = formState;

  const onSubmit = (data) => {
    // Handle login logic (API call)
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form className="p-4 border rounded shadow" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center mb-4">Login</h2>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email</label>
              <input
                type="email"
                id="Email"
                className="form-control"
                {...register('Email')}
                placeholder="Enter your email"
              />
              {errors.Email && <p className="text-danger">{errors.Email.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Password</label>
              <input
                type="password"
                id="Password"
                className="form-control"
                {...register('Password')}
                placeholder="Enter your password"
              />
              {errors.Password && <p className="text-danger">{errors.Password.message}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!isValid}
            >
              Login
            </button>

            {isSubmitted && isValid && (
              <p className="text-success mt-2">Login successful!</p>
            )}
          </form>

          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Login;
