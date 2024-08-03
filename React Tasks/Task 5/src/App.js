import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
     
    } catch (error) {
      setError("root", {
        message: "This email is already taken"
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  const validateEmail = (input) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(input);
  };

  const validatemessage =(input)=>{
    const messagepattern = /^[a-zA-Z0-9\s.,?!@#%&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    return messagepattern.test(input)
  }

  const validatename = (input)=> {
    const namePattern = /^[a-zA-Z\s'-]+$/; 
    return namePattern.test(input)
  }

  return (
    <div className="form-container">
      <h1 className="form-header">Contact Form</h1>
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            {...register("name", {
              required: "Name is required",validate: (value)=>{
                if (!validatename(value)){
                  return "Enter proper name"
                }
              },
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long"
              }
            })}
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && <div className="form-error">{errors.name.message}</div>}
        </div>

        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!validateEmail(value)) {
                  return "Invalid Email";
                }
              }
            })}
            type="text"
            placeholder="Enter your email"
          />
          {errors.email && <div className="form-error">{errors.email.message}</div>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              },
              validate: (value) => {
                if (!/[a-zA-Z]/.test(value)) {
                  return "Password must contain at least one letter";
                }
                if (!/\d/.test(value)) {
                  return "Password must contain at least one number";
                }
                return true;
              }
            })}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && <div className="form-error">{errors.password.message}</div>}
        </div>

       
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className={`form-input ${errors.message ? 'form-input-error' : ''}`}
            {...register("message", {
               validate: (value) =>{
              if (value.trim() == ""){
                return "Message Can't be Empty"
              }
              if (!validatemessage(value)){
                return "Please enter Proper Message"
              }
              return true
              },
              minLength: {
                value: 5,
                message: "Message must be at least 5 characters long"
              }
            })}
            placeholder="Enter your message"
          />
          {errors.message && <div className="form-error">{errors.message.message}</div>}
        </div>

        <button disabled={isSubmitting} className="form-submit-btn" type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && <div className="form-error">{errors.root.message}</div>}
      </form>
    </div>
  );
};

export default App;
