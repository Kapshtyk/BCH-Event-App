import React from 'react'
import classes from './Faq.module.css'

const Faq = () => {
  return (
    <div className={classes.faq}>
      <h2>Frequently Asked Questions</h2>
      <div className={classes.question}>
        <h3>1. How do I purchase event tickets?</h3>
        <div className={classes.answer}>
          <p>To purchase event tickets, navigate to the "Tickets" section in the app
            and select the desired event. Then, choose the number of tickets you
            want and proceed with the payment.</p>
        </div>
      </div>

      <div className={classes.question}>
        <h3>2. Can I cancel my ticket and get a refund?</h3>
        <div className={classes.answer}>
          <p>Yes, you can cancel your ticket and request a refund within 24 hours of
            the purchase. Please contact our support team with your ticket details
            to initiate the refund process.</p>
        </div>
      </div>

      <div className={classes.question}>
        <h3>3. How can I update my personal information?</h3>
        <div className={classes.answer}>
          <p>To update your personal information, go to the "Profile" section and
            select the "Edit Profile" option. From there, you can modify your
            details such as name, email, and contact information.</p>
        </div>
      </div>

      <div className={classes.question}>
        <h3>4. What should I do if I forget my event registration code?</h3>
        <div className={classes.answer}>
          <p>If you forget your event registration code, you can retrieve it by going
            to the "My Events" section and selecting the specific event. The
            registration code will be displayed under the event details.</p>
        </div>
      </div>

      <div className={classes.question}>
        <h3>5. How do I contact the event organizers for further assistance?</h3>
        <div className={classes.answer}>
          <p>If you need further assistance, you can contact the event organizers by
            sending an email to support@example.com or by calling our customer
            support hotline at 123-456-7890.</p>
        </div>
      </div>
    </div>
  )
}

export default Faq
