import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Form.css';

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
    });

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    const [selectedOption, setSelectedOption] = useState('Select Location');
    const [selectedOption2, setSelectedOption2] = useState('Select Cusine');
    const [selectedOption3, setSelectedOption3] = useState('Select Kitchen Type');
    const [selectedOption4, setSelectedOption4] = useState('Select Parking');
    const [selectedOption5, setSelectedOption5] = useState('Select Franchise');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen);
    };


    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleOptionClick2 = (option) => {
        setSelectedOption2(option);
        setIsOpen(false);
    };

    const handleOptionClick3 = (option) => {
        setSelectedOption3(option);
        setIsOpen1(false);
    };

    const handleOptionClick4 = (option) => {
        setSelectedOption4(option);
        setIsOpen(false);
    };

    const handleOptionClick5 = (option) => {
        setSelectedOption5(option);
        setIsOpen(false);
    };

    const cusine = ['Cantonese', 'Afghan', 'Ice Cream', 'Italian', 'Continental', 'British', 'Mughlai', 'Grill', 'Burmese', 'Korean', 'Healthy Food', 'Tibetan', 'Bakery', 'French', 'Vietnamese', 'South Indian', 'Wraps', 'Burger', 'Desserts', 'South American', 'Biryani', 'Hyderabadi', 'Seafood', 'North Eastern', 'European', 'Mongolian', 'Filipino', 'Tex-Mex', 'Lebanese', 'Cafe Food', 'Juices', 'Tea', 'Momos', 'Assamese', 'Spanish', 'Gujarati', 'Falafel', 'Bohri', 'Mediterranean', 'Indian', 'Steak', 'Japanese', 'Mexican', 'Parsi', 'Charcoal Chicken', 'Maharashtrian', 'Bengali', 'Bihari', 'Portuguese', 'Frozen Yogurt', 'Mangalorean', 'Pizza', 'Kashmiri', 'American', 'Mithai', 'Awadhi', 'Lucknowi', 'Asian', 'Deli', 'Street Food', 'Chinese', 'Turkish', 'BBQ', 'Indonesian', 'Beverages', 'Coffee', 'Cafe', 'Roast Chicken', 'Salad', 'Rajasthani', 'Sindhi', 'Konkan', 'Singaporean', 'Kerala', 'Modern Indian', 'Arabian', 'Andhra', 'Malwani', 'Thai', 'Sushi', 'Finger Food', 'Malaysian', 'Chettinad', 'Rolls', 'Paan', 'Greek', 'Iranian', 'Goan', 'Middle Eastern', 'North Indian', 'Sandwich', 'Kebab', 'Oriya', 'German', 'Bubble Tea', 'Bar Food', 'Brazilian', 'Nepalese', 'Fast Food']

    const location = ['Pune', 'FC Road', 'Shivaji Nagar', 'Baner', 'Koregaon Park', 'Viman Nagar', 'Senapati Bapat Road', 'Kalyani Nagar', 'Kothrud', 'Pimple Saudagar', 'Dhankawadi', 'Aundh', 'Hinjawadi', 'Pimpri', 'Katraj', 'Mundhwa', 'Sinhgad Road', 'Magarpatta', 'Wakad', 'Wagholi', 'Kharadi', 'Bibvewadi', 'Kondhwa', 'Nigdi', 'Ravet', 'Erandwane', 'Sadashiv Peth', 'Chinchwad', 'Wadgaon Sheri', 'Narhe', 'Camp Area', 'Wanowrie', 'Karve Nagar', 'NIBM Road', 'Hadapsar', 'Pimple Nilakh', 'Bavdhan', 'Pashan', 'Yerawada', 'Pimple Gurav', 'Balewadi', 'Salunkhe Vihar Road', 'Warje', 'Bhosari', 'Chandan Nagar', 'Lohegaon', 'Pune-Solapur Road', 'Dhanori', 'Vishrantwadi', 'Akurdi']

    const kitchenType = ['Dine in','Cloud Kitchen']

    const parkingInfo = ['Yes','No']

    const franchiseInfo = ['Independent','Franchise']

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        Dbutton.style.display = 'none';
        pbutton.style.display = 'none';
        lbutton.style.display = 'none';
        const input = document.getElementById('pdfContent');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
        });
        Dbutton.style.display = 'block';
        pbutton.style.display = 'block';
        lbutton.style.display = 'block';
    };

    if (showConfirmation) {
        return (
            <div id="pdfContent" className='confirmation'>
                <h1 className='hHeader'>Confirmation</h1>
                <p>Location: {selectedOption}</p>
                <p>Area: {formData.area}</p>
                <p>Parking Info: {selectedOption4}</p>
                <p>Cuisine: {selectedOption2}</p>
                <p>Kitchen Type: {selectedOption3}</p>
                <p>Fixed Capital: {formData.fixedCapital}</p>
                <p>Variable Capital: {formData.variableCapital}</p>
                <p>Franchise Info: {selectedOption5}</p>
                <button id="previousButton" className='pButton' onClick={lastPrevStep}>Previous</button>
                <button id="downloadButton" className='pButton' onClick={downloadPDF}>Download</button>
                <button id="lgButton" className='logoutButton' onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    switch (step) {
        case 1:
            return (
                <div className="locInfo">
                    <h1 className='hHeader'>Location</h1>
                    <button className="nButton" onClick={toggleDropdown}>
                        <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                        </img>
                        {selectedOption}
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {location.map((option, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionClick(option)}
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
                <div className='areaInfo'>
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
                        <button className="nButton" onClick={toggleDropdown}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption4}
                        </button>
                        {isOpen && (
                            <ul className="dropdown-menu">
                                {parkingInfo.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick4(option)}
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
                        <button className="nButton" onClick={toggleDropdown}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption2}
                        </button>
                        {isOpen && (
                            <ul className="dropdown-menu">
                                {cusine.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick2(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className="nButton" onClick={toggleDropdown1}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption3}
                        </button>
                        {isOpen1 && (
                            <ul className="dropdown-menu">
                                {kitchenType.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick3(option)}
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
                        <button className="nButton" onClick={toggleDropdown}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption5}
                        </button>
                        {isOpen && (
                            <ul className="dropdown-menu">
                                {franchiseInfo.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick5(option)}
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