// import React from "react";
// 
// const Contact = () => {
//    
//   return (
//     <section>
//       <div className="px-4 mx-auto max-w-screen-md">
//         <h2 className="heading text-center">Contact Us</h2>
//         <p className="mb-8 lg:mb-16 font-light text-center text__para ">
//           {" "}
//           Got a technical issue? want to send feedback about a beta feature, Let
//           us know
//         </p>
// 
//         <form action="#" className="space-y-8" >
//           <div>
//             <label htmlFor="email" className="form__label">
//               Your Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="example@gmail.com"
//               className="form__input mt-1"
//               required
//              
//             />
//           </div>
// 
//           <div>
//             <label htmlFor="subject" className="form__label">
//               Subject
//             </label>
//             <input
//               type="text"
//               placeholder="Let us know how we can help you"
//               className="form__input mt-1"
//               required
//             />
//           </div>
// 
//           <div className="sm:col-span-2">
//             <label htmlFor="message" className="form__label">
//               Your Message
//             </label>
//             <textarea
//               rows="6"
//               type="text"
//               id="message"
//               placeholder="Write Your Message"
//               className="form__input mt-1"
//               required
//             />
//           </div>
// 
//           <button type="submit" className="btn rounded sm:w-fit">
//             submit
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };
// 
// export default Contact;

 
import React, { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your code for handling the form submission can go here
    // For example, you can send the form data to a server or perform validation

    // After handling the submission, set showMessage to true and clear the form fields.
    setShowMessage(true);
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para ">
          Got a technical issue? want to send feedback about a beta feature, Let
          us know
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form__input mt-1"
              required
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              placeholder="Let us know how we can help you"
              className="form__input mt-1"
              required
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              placeholder="Write Your Message"
              className="form__input mt-1"
              required
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn rounded sm:w-fit">
            Submit
          </button>
        </form>

        {showMessage && (
          <div className="text-center">
            <p className="text-xl font-semibold mt-4 ">Thanks for Contacting Us...!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
