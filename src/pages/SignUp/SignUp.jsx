import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const validationSchema = Yup.object({
    Name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    Email: Yup.string().email('Invalid email address').required('Email is required'),
    Password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });
  const Navigate=useNavigate()

  const { register, handleSubmit, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      Name: '',
      Email: '',
      Password: ''
    }
  });

  const { errors, isSubmitted, isValid, submitCount } = formState;

  const onSubmit = (data) => {
    // Call API or handle form data here
    console.log(data);
    Navigate('/login')
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          {submitCount > 3 ? (
            <div className="alert alert-danger" role="alert">
              <strong>Danger!</strong> Too many submission attempts.
            </div>
          ) : (
            <form className="p-4 border rounded shadow" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center mb-4">Sign Up</h2>

              <div className="mb-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <input
                  type="text"
                  id="Name"
                  className="form-control"
                  {...register('Name')}
                  placeholder="Enter your name"
                />
                {errors.Name && <p className="text-danger">{errors.Name.message}</p>}
              </div>

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
                disabled={!isValid && !isSubmitted}
              >
                Submit
              </button>

              {isSubmitted && !isValid && (
                <p className="text-danger mt-2">Form submission failed. Please correct the errors.</p>
              )}

              {isSubmitted && isValid && (
                <p className="text-success mt-2">Form submitted successfully!</p>
              )}
            </form>
          )}

          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
