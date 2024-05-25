// src/Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "Email is required";
    if (email) {
      tempErrors.email = /\S+@\S+\.\S+/.test(email) ? "" : "Email is not valid";
    }
    tempErrors.password = password ? "" : "Password is required";
    if (password) {
      tempErrors.password = password.length >= 6 ? "" : "Password must be at least 6 characters long";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted');
    }
  };

  return (
    <div>
<header>
  <div class="headerSection">
    <div class="logoAndName">
      <svg>
        <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" fill="black" />
      </svg>
      <h1>Logo &amp; Name</h1>
    </div>
    <div class="invoiceDetails">
      <h2>Invoice #100</h2>
      <p>
        07 March 2021
      </p>
    </div>
  </div>
  <hr />
  <div class="headerSection">
    <div>
      <h3>Invoice to</h3>
      <p>
        <b>Client Name</b>
        <br />
        123 Alphabet Road, Suite 01
        <br />
        Indianapolis, IN 46260
        <br />
        <a href="mailto:clientname@clientwebsite.com">
          clientname@clientwebsite.com
        </a>
        <br />
        317.123.8765
      </p>
    </div>
    <div>
      <h3>Due Date</h3>
      <p>
        <b>07 April 2021</b>
      </p>
      <h3>Amount</h3>
      <p>
        <b>$3,500</b>
      </p>
    </div>
  </div>
</header>

<footer>
    <a href="https://companywebsite.com">
      companywebsite.com
    </a>
    <a href="mailto:company@website.com">
      company@website.com
    </a>
    <span>
      317.123.8765
    </span>
    <span>
      123 Alphabet Road, Suite 01, Indianapolis, IN 46260
    </span>
</footer>

{/* <main>
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Selected Choice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <b>Location</b>
          <br />
          Description goes here
        </td>
        <td>
        {selectedOption}
        </td>
      </tr>
      <tr>
        <td>
          <b>Area</b>
          <br />
          Description goes here
        </td>
        <td>
        {formData.area}
        </td>
      </tr>
      <tr>
        <td>
          <b>Parking Info</b>
          <br />
          Description goes here
        </td>
        <td>
        {selectedOption4}
        </td>
      </tr>
      <tr>
        <td>
          <b>Cuisine</b>
          <br />
          Description goes here
        </td>
        <td>
        {selectedOption2}
        </td>
      </tr>
      <tr>
        <td>
          <b>Kitchen Type</b>
          <br />
          Description goes here
        </td>
        <td>
        {selectedOption3}
        </td>
      </tr>
      <tr>
        <td>
          <b>Fixed Capital</b>
          <br />
          Description goes here
        </td>
        <td>
        {formData.fixedCapital}
        </td>
      </tr>
      <tr>
        <td>
          <b>Variable Capital</b>
          <br />
          Description goes here
        </td>
        <td>
        {formData.variableCapital}
        </td>
      </tr>
      <tr>
        <td>
          <b>Franchise Info</b>
          <br />
          Description goes here
        </td>
        <td>
        {selectedOption5}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="summary">
    <tr>
      <th>
        Subtotal
      </th>
      <td>
        $1200.00
      </td>
    </tr>
    <tr>
      <th>
        Tax 4.7%
      </th>
      <td>
        $000.00
      </td>
    </tr>
    <tr class="total">
      <th>
        Total
      </th>
      <td>
        $12,000.00
      </td>
    </tr>
  </table>
</main> */}

<aside>
  
  <hr />
  <div>
    <div>
      <b>Terms &amp; Conditions</b>
      <p>
        Please make payment within 30 days of issue of the invoice.
      </p>
    </div>
    <div>
      <b>Payment Options</b>
      <ul>
        <li>Paypal</li>
        <li>Credit Card</li>
      </ul>
    </div>
  </div>
</aside>

</div>
  );
};

export default Login;

//['Cantonese', 'Afghan', 'Ice Cream', 'Italian', 'Continental', 'British', 'Mughlai', 'Grill', 'Burmese', 'Korean', 'Healthy Food', 'Tibetan', 'Bakery', 'French', 'Vietnamese', 'South Indian', 'Wraps', 'Burger', 'Desserts', 'South American', 'Biryani', 'Hyderabadi', 'Seafood', 'North Eastern', 'European', 'Mongolian', 'Filipino', 'Tex-Mex', 'Lebanese', 'Cafe Food', 'Juices', 'Tea', 'Momos', 'Assamese', 'Spanish', 'Gujarati', 'Falafel', 'Bohri', 'Mediterranean', 'Indian', 'Steak', 'Japanese', 'Mexican', 'Parsi', 'Charcoal Chicken', 'Maharashtrian', 'Bengali', 'Bihari', 'Portuguese', 'Frozen Yogurt', 'Mangalorean', 'Pizza', 'Kashmiri', 'American', 'Mithai', 'Awadhi', 'Lucknowi', 'Asian', 'Deli', 'Street Food', 'Chinese', 'Turkish', 'BBQ', 'Indonesian', 'Beverages', 'Coffee', 'Cafe', 'Roast Chicken', 'Salad', 'Rajasthani', 'Sindhi', 'Konkan', 'Singaporean', 'Kerala', 'Modern Indian', 'Arabian', 'Andhra', 'Malwani', 'Thai', 'Sushi', 'Finger Food', 'Malaysian', 'Chettinad', 'Rolls', 'Paan', 'Greek', 'Iranian', 'Goan', 'Middle Eastern', 'North Indian', 'Sandwich', 'Kebab', 'Oriya', 'German', 'Bubble Tea', 'Bar Food', 'Brazilian', 'Nepalese', 'Fast Food']
/*[ 'Pune',
'FC Road',
'Shivaji Nagar',
'Baner',
'Koregaon Park',
'Viman Nagar',
'Senapati Bapat Road',
'Kalyani Nagar',
'Kothrud',
'Pimple Saudagar',
'Dhankawadi',
'Aundh',
'Hinjawadi',
'Pimpri',
'Katraj',
'Mundhwa',
'Sinhgad Road',
'Magarpatta',
'Wakad',
'Wagholi',
'Kharadi',
'Bibvewadi',
'Kondhwa',
'Nigdi',
'Ravet',
'Erandwane',
'Sadashiv Peth',
'Chinchwad',
'Wadgaon Sheri',
'Narhe',
'Camp Area',
'Wanowrie',
'Karve Nagar',
'NIBM Road',
'Hadapsar',
'Pimple Nilakh',
'Bavdhan',
'Pashan',
'Yerawada',
'Pimple Gurav',
'Balewadi',
'Salunkhe Vihar Road',
'Warje',
'Bhosari',
'Chandan Nagar',
'Lohegaon',
'Pune-Solapur Road',
'Dhanori',
'Vishrantwadi',
'Akurdi' ] */


