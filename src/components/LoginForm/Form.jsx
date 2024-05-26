import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Form.css';
import ReactToPrint from 'react-to-print';
import logo from '../logo.png';

const Form = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        location: '',
        area: '',
        parkingInfo: '',
        cuisine: '',
        kitchenType: '',
        fixedCapital: '',
        variableCapital: '',
        franchiseInfo: '',
        timings: '',
    });
    const [errors, setErrors] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);

    const [selectedOption, setSelectedOption] = useState('Select Location');
    const [selectedOption2, setSelectedOption2] = useState('Select Cuisine');
    const [selectedOption3, setSelectedOption3] = useState('Select Kitchen Type');
    const [selectedOption4, setSelectedOption4] = useState('Select Parking');
    const [selectedOption5, setSelectedOption5] = useState('Select Franchise');
    const [selectedOption6, setSelectedOption6] = useState('Select Timings');
    const [selectedOption7, setSelectedOption7] = useState('Select Cuisine Type');

    const toggleDropdown = (dropdown) => {
        if (dropdown === 'location') setIsOpen(!isOpen);
        if (dropdown === 'cuisine') setIsOpen2(!isOpen2);
        if (dropdown === 'kitchenType') setIsOpen1(!isOpen1);
        if (dropdown === 'parking') setIsOpen3(!isOpen3);
        if (dropdown === 'franchise') setIsOpen4(!isOpen4);
        if (dropdown === 'timings') setIsOpen5(!isOpen5);
        if (dropdown === 'cuisineTypes') setIsOpen6(!isOpen6);
    };

    const handleOptionClick = (option, dropdown) => {
        if (dropdown === 'location') {
            setSelectedOption(option);
            setIsOpen(false);
            fetchCuisines(option);
            fetchTimings(option);
            fetchCuisinesTypes(option);
            fetchRentForTwo(option);
            fetchRent(option);
        }
        if (dropdown === 'cuisine') {
            setSelectedOption2(option);
            setIsOpen2(false);
        }
        if (dropdown === 'kitchenType') {
            setSelectedOption3(option);
            setIsOpen1(false);
        }
        if (dropdown === 'parking') {
            setSelectedOption4(option);
            setIsOpen3(false);
        }
        if (dropdown === 'franchise') {
            setSelectedOption5(option);
            setIsOpen4(false);
        }
        if (dropdown === 'timings') {
            setSelectedOption6(option);
            setIsOpen5(false);
        }
        if (dropdown === 'cuisineTypes') {
            setSelectedOption7(option);
            setIsOpen6(false);
        }
    };

    const fetchCuisines = (location) => {
        fetch(`http://127.0.0.1:5001/info?locality=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.Cuisines) {
                    setItems(data.Cuisines);
                } else {
                    setItems([]);
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    };

    const fetchTimings = (location) => {
        fetch(`http://127.0.0.1:5001/info?locality=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.Timings) {
                    setTimingsItems(data.Timings);
                } else {
                    setTimingsItems([]);
                }
            })
            .catch(error => console.error('Error fetching timings:', error));
    };

    const fetchCuisinesTypes = (location) => {
        fetch(`http://127.0.0.1:5001/info?locality=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data && data['Cuisine Types']) {
                    setCuisineTypesItems(data['Cuisine Types']);
                } else {
                    setCuisineTypesItems([]);
                }
            })
            .catch(error => console.error('Error fetching cusine types:', error));
    };

    const fetchRentForTwo = (location) => {
        fetch(`http://127.0.0.1:5001/info?locality=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data && data['Price for two']) {
                    setRentForTwoItems(data['Price for two']);
                } else {
                    setRentForTwoItems([]);
                }
            })
            .catch(error => console.error('Error fetching rent for two:', error));
    };

    const fetchRent = (location) => {
        fetch(`http://127.0.0.1:5001/info?locality=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data && data['Rent']) {
                    setRentItems(data['Rent']);
                } else {
                    setRentItems([]);
                }
            })
            .catch(error => console.error('Error fetching rent:', error));
    };

    useEffect(() => {
        setItems([]);
        setTimingsItems([]);
        setCuisineTypesItems([]);
        setRentForTwoItems([]);
    }, []);

    const [items, setItems] = useState([]);
    const [timingsItems, setTimingsItems] = useState([]);
    const [cuisineTypesItems, setCuisineTypesItems] = useState([]);
    const [rentForTwoItems, setRentForTwoItems] = useState([]);
    const [rentItems, setRentItems] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const allCuisine = ['Cantonese', 'Afghan', 'Ice Cream', 'Italian', 'Continental', 'British', 'Mughlai', 'Grill', 'Burmese', 'Korean', 'Healthy Food', 'Tibetan', 'Bakery', 'French', 'Vietnamese', 'South Indian', 'Wraps', 'Burger', 'Desserts', 'South American', 'Biryani', 'Hyderabadi', 'Seafood', 'North Eastern', 'European', 'Mongolian', 'Filipino', 'Tex-Mex', 'Lebanese', 'Cafe Food', 'Juices', 'Tea', 'Momos', 'Assamese', 'Spanish', 'Gujarati', 'Falafel', 'Bohri', 'Mediterranean', 'Indian', 'Steak', 'Japanese', 'Mexican', 'Parsi', 'Charcoal Chicken', 'Maharashtrian', 'Bengali', 'Bihari', 'Portuguese', 'Frozen Yogurt', 'Mangalorean', 'Pizza', 'Kashmiri', 'American', 'Mithai', 'Awadhi', 'Lucknowi', 'Asian', 'Deli', 'Street Food', 'Chinese', 'Turkish', 'BBQ', 'Indonesian', 'Beverages', 'Coffee', 'Cafe', 'Roast Chicken', 'Salad', 'Rajasthani', 'Sindhi', 'Konkan', 'Singaporean', 'Kerala', 'Modern Indian', 'Arabian', 'Andhra', 'Malwani', 'Thai', 'Sushi', 'Finger Food', 'Malaysian', 'Chettinad', 'Rolls', 'Paan', 'Greek', 'Iranian', 'Goan', 'Middle Eastern', 'North Indian', 'Sandwich', 'Kebab', 'Oriya', 'German', 'Bubble Tea', 'Bar Food', 'Brazilian', 'Nepalese', 'Fast Food']
    const locationOptions = ['FC Road', 'Shivaji Nagar', 'Baner', 'Koregaon Park', 'Viman Nagar', 'Senapati Bapat Road', 'Kalyani Nagar', 'Kothrud', 'Pimple Saudagar', 'Dhankawadi', 'Aundh', 'Hinjawadi', 'Pimpri', 'Katraj', 'Mundhwa', 'Sinhgad Road', 'Magarpatta', 'Wakad', 'Wagholi', 'Kharadi', 'Bibvewadi', 'Kondhwa', 'Nigdi', 'Ravet', 'Erandwane', 'Sadashiv Peth', 'Chinchwad', 'Wadgaon Sheri', 'Narhe', 'Camp Area', 'Wanowrie', 'Karve Nagar', 'NIBM Road', 'Hadapsar', 'Pimple Nilakh', 'Bavdhan', 'Pashan', 'Yerawada', 'Pimple Gurav', 'Balewadi', 'Salunkhe Vihar Road', 'Warje', 'Bhosari', 'Chandan Nagar', 'Lohegaon', 'Pune-Solapur Road', 'Dhanori', 'Vishrantwadi', 'Akurdi'];
    const kitchenTypeOptions = ['Dine in', 'Cloud Kitchen'];
    const parkingInfoOptions = ['Yes', 'No'];
    const franchiseInfoOptions = ['Independent', 'Franchise'];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (validate() && formData.area != null) {

          }
    };

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const lastPrevStep = () => {
        setStep(4);
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
        console.log('User logged out');
    };

    const submitForm = () => {
        setShowConfirmation(true);
    };

    const downloadPDF = () => {
        const Dbutton = document.getElementById('downloadButton');
        const pbutton = document.getElementById('previousButton');
        const lbutton = document.getElementById('lgButton');

        // Hide buttons
        Dbutton.style.display = 'none';
        pbutton.style.display = 'none';
        lbutton.style.display = 'none';

        // Get the content to convert to PDF
        const input = document.getElementById('pdfContent');

        // Use html2canvas to create a canvas
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'px', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, -13, pdfWidth, pdfHeight);

            // Save the PDF
            pdf.save('download.pdf');

            // Show buttons again
            Dbutton.style.display = 'block';
            pbutton.style.display = 'block';
            lbutton.style.display = 'block';
        });
    }
    
    const validate = () => {
        let tempErrors = {};
        tempErrors.area = formData.area ? "" : "Area is required";
        if (formData.area) {
            tempErrors.area = /^\d+$/.test(formData.area) ? "" : "Area is not valid";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    if (showConfirmation) {
        return (
            <div id="pdfContent" className='confirmation'>
                <header>
                    <div className="headerSection">
                        <div className="logoAndName">
                            <img src={logo} className='w-16' alt="logo">
                            </img>
                            <h1>BE Project App</h1>
                        </div>
                        <div className="invoiceDetails">
                            <p className='hHeader'>Business Response Report</p>
                        </div>
                    </div>
                    <hr />
                    <div className="headerSection">
                        <div>
                            <p>
                                <a href="mailto:clientname@clientwebsite.com">

                                </a>
                                <br />
                            </p>
                        </div>
                    </div>
                </header>

                <div class="container">
                    <div class="header">
                        <h1 className='topHeader'>Comprehensive Report on Selected Restaurant Parameters:</h1>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Introduction:</h2>
                        <p>The success of a restaurant hinges on various factors, each playing a crucial role in attracting and retaining customers. This comprehensive report delves into the importance of the selected parameters in shaping the prospects of a restaurant, providing valuable insights into user preferences and market trends.</p>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Location and Area:</h2>
                        <p>The significance of {selectedOption} in the restaurant industry cannot be overstated. It directly impacts foot traffic, accessibility, and visibility. A strategically chosen location, coupled with the appropriate area size as per the target market, enhances the restaurant's chances of success. It's imperative to analyze demographic trends and competition in the vicinity to capitalize on the location advantage.</p>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Parking Info:</h2>
                        <p>Convenient parking facilities, in this case {selectedOption4} can significantly influence diners' decisions, especially in urban areas where parking space is often limited. Offering ample parking or valet services can enhance customer satisfaction and encourage repeat visits, thus boosting revenue generation.</p>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Timings:</h2>
                        <p>These operating hours {timingsItems[0]}, {timingsItems[1]}, {timingsItems[2]}, {timingsItems[3]}, {timingsItems[4]} of restaurant play a pivotal role in catering to diverse customer needs and preferences. Adhering to flexible timings can capture different segments of the market, including breakfast, lunch, dinner, and late-night dining. Additionally, aligning timings with peak demand periods maximizes profitability and operational efficiency.</p>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Price for two:</h2>
                        <p>The price for two in this area is Rs. {rentForTwoItems}</p>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Cuisine, Cuisine Type, and Kitchen Type:</h2>
                        <p>You have selected {selectedOption2} but the popular culinary offerings here are {items[0]}, {items[1]}, {items[2]}, {items[3]}, {items[4]} with cuisine type {cuisineTypesItems[0]}, {cuisineTypesItems[1]}, {cuisineTypesItems[2]}, {cuisineTypesItems[3]}, {cuisineTypesItems[4]} a restaurant are at the core of its identity and appeal. The selection of cuisine, cuisine type (e.g., authentic, fusion, vegan), and kitchen type (e.g., open, closed, exhibition) directly influences the target audience and competitive positioning. Understanding market trends and consumer preferences is vital in curating a menu that resonates with the target demographic while maintaining profitability and uniqueness.</p>
                    </div>

                    <div class="report-section">
                        <h2 className='headingTop'>Capital Investment:</h2>
                        <p>The allocation a capital of  {formData.fixedCapital} fixed and {formData.variableCapital} variable, is a critical determinant of the restaurant's financial viability and sustainability. While fixed capital encompasses one-time expenses such as equipment and decor, variable capital covers ongoing costs like ingredients and labor. Striking a balance between fixed and variable expenses is essential for maintaining cash flow and achieving profitability in the long run.</p>
                        <p>The estimated monthly rent is Rs.{formData.area * rentItems}</p>
                    </div>


                    <div class="report-section">
                        <h2 className='headingTop'>Franchise Info:</h2>
                        <p>Opting for a franchise model of {selectedOption5} can provide access to established brand recognition, operational support, and standardized processes. However, it requires careful evaluation of franchisor reputation, fees, and contractual obligations to ensure a mutually beneficial partnership. Franchising offers scalability opportunities but demands adherence to brand standards and guidelines.</p>
                    </div>



                    <div class="conclusion-report-section">
                        <h2 className='headingTop'>Conclusion:</h2>
                        <p>In conclusion, the selected parameters encompass key facets of restaurant operations, each holding significance in shaping the success trajectory of the establishment. By leveraging insights derived from these factors and making informed strategic decisions, restaurant owners can effectively navigate the competitive landscape and carve a niche for themselves in the dynamic foodservice industry.</p>
                    </div>
                </div>
                <div>
                    <button id="previousButton" className='pButton' onClick={lastPrevStep}>Previous</button>
                    <button id="downloadButton" className='pButton' onClick={downloadPDF}>Download</button>

                    <button id="lgButton" className='logoutButton' onClick={handleLogout}>Logout</button>
                    <footer className='footerForm'>
                        <a href="https://beprojfinal.netlify.app/">
                            Our Website
                        </a>
                        <a href="shindearyajeet@gmail.com">
                            Our Mail
                        </a>
                        <span>
                            Group No. 47
                        </span>
                        <span>
                            Pune, India
                        </span>
                    </footer>
                </div>
            </div>
        );
    }

    switch (step) {
        case 1:
            return (
                <div className="locInfo">
                    <h1 className='hHeader'>Location</h1>
                    <button className="nButton" onClick={() => toggleDropdown('location')}>
                        <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                        </img>
                        {selectedOption}
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {locationOptions.map((option, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionClick(option, 'location')}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className='nButton' onClick={nextStep}>Next</button>
                </div>
            );

        case 2:
            return (
                <div className='aInfo'>
                    <h1 className='hHeader'>Area and Parking Info</h1>
                    <div className="inputs">
                        <div className="input">
                            <input
                                type="text"
                                name="area"
                                placeholder="Area"
                                value={formData.area}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.area && <p className="errorMsg">{errors.area}</p>}
                        <button className="nButton" onClick={() => toggleDropdown('parking')}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption4}
                        </button>
                        {isOpen3 && (
                            <ul className="dropdown-menu">
                                {parkingInfoOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option, 'parking')}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <br />
                    <button className='pButton' onClick={prevStep}>Previous</button>
                    <button className='nButton' onClick={nextStep}>Next</button>
                </div>
            );

        case 3:
            return (
                <div className='cInfo'>
                    <h1 className='hHeader'>Cuisine and Kitchen Type</h1>
                    <div className="inputs">
                        <button className="nButton" onClick={() => toggleDropdown('cuisine')}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption2}
                        </button>
                        {isOpen2 && (
                            <ul className="dropdown-menu">
                                {allCuisine.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option, 'cuisine')}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className="nButton" onClick={() => toggleDropdown('kitchenType')}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption3}
                        </button>
                        {isOpen1 && (
                            <ul className="dropdown-menu">
                                {kitchenTypeOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option, 'kitchenType')}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <br />
                    <button className='pButton' onClick={prevStep}>Previous</button>
                    <button className='nButton' onClick={nextStep}>Next</button>
                </div>
            );

        case 4:
            return (
                <div className='capInfo'>
                    <h1 className='hHeader'>Capital and Franchise Info</h1>
                    <div className="inputs">
                        <div className="input">
                            <input
                                type="text"
                                name="fixedCapital"
                                placeholder="Fixed Capital"
                                value={formData.fixedCapital}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                name="variableCapital"
                                placeholder="Variable Capital"
                                value={formData.variableCapital}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="nButton" onClick={() => toggleDropdown('franchise')}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption5}
                        </button>
                        {isOpen4 && (
                            <ul className="dropdown-menu">
                                {franchiseInfoOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option, 'franchise')}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <br />
                    <button className='pButton' onClick={prevStep}>Previous</button>
                    <button className='nButton' onClick={submitForm}>Submit</button>
                </div>
            );

        default:
            return null;
    }
};

export default Form;
