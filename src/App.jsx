import "./App.css";
import { useForm } from "react-hook-form";
import PaystackPop from "@paystack/inline-js";
// import { collection, addDoc} from "firebase/firestore";
// import { db } from "./firebase";
import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Spin } from "antd";
import { useState } from "react";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [isCancel, setIsCancel] = useState(false);
  const onSubmit = async (data) => {
    console.log(data)
    setIsSubmitting(true);
    
    // try {
    //   const userDataRef = await addDoc(collection(db, "userData"), {
    //     userData: data
    //   });
    //   console.log("User Data written with ID: ", userDataRef);
    // }
    // catch(e){
    //   console.log("Error Submitting information: ", errors)
    // }

    const paystackKey = import.meta.env.VITE_PUBLIC_KEY
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: paystackKey,
      email: data.email,
      amount: 100 * 100,

      onSuccess: () => {
        // alert(`Payment successful reference ${transaction.reference}`);
        setIsSuccess(true);
        setIsSubmitting(false);
      },
      onCancel: () => {
        // alert("You  didn't complete the transaction");
        setIsCancel(true);
         setIsSubmitting(false);
      },
    });
    reset();
  }

  // const fetchUserData = async () =>{
  //   await getDocs(collection(db, "userData"))
  //   .then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
  //     setUser(newData);
  //     console.log(user, newData)
  //   })
  // }

  // useEffect(()=>{
  //   fetchUserData();
  // }, [])

  return (
    <>
      {isSuccess && (
        <Alert
          message="Successful"
          description={"Transaction Completed Successfully"}
          type="success"
          showIcon
          direction
          closable
        />
      )}
      {isCancel && (
        <Alert
          message="Warning"
          description="You didn't complete the transaction"
          type="warning"
          showIcon
          closable
        />
      )}
      <section className="form-wrapper">
        <div className="todo">
          <h1 className="header">Contact Us</h1>
          <hr />
          <section className="form-container">
            <p>Please fill in your details</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="errors">{errors.firstName.message}</p>
                )}
              </div>
              <div className="form-control">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="errors">{errors.lastName.message}</p>
                )}
              </div>
              <div className="form-control">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "This is not a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errors">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label>
                  Your Address <span>*</span>
                </label>
                <textarea
                  rows={5}
                  type="text"
                  name="address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <p className="errors">{errors.address.message}</p>
                )}
              </div>
              <div className="btn-container">
                <button type="Submit" className={`btn`} disabled={!isValid}>
                  {isSubmitting ? (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 24,
                          }}
                          spin
                        />
                      }
                    />
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default App;
