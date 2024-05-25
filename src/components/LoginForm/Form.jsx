import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Form.css';
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
            fetchCuisinesTypes(option)
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

    useEffect(() => {
        setItems([]);
        setTimingsItems([]);
        setCuisineTypesItems([]);
    }, []);

    const [items, setItems] = useState([]);
    const [timingsItems, setTimingsItems] = useState([]);
    const [cuisineTypesItems, setCuisineTypesItems] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const locationOptions = ['FC Road', 'Shivaji Nagar', 'Baner', 'Koregaon Park', 'Viman Nagar', 'Senapati Bapat Road', 'Kalyani Nagar', 'Kothrud', 'Pimple Saudagar', 'Dhankawadi', 'Aundh', 'Hinjawadi', 'Pimpri', 'Katraj', 'Mundhwa', 'Sinhgad Road', 'Magarpatta', 'Wakad', 'Wagholi', 'Kharadi', 'Bibvewadi', 'Kondhwa', 'Nigdi', 'Ravet', 'Erandwane', 'Sadashiv Peth', 'Chinchwad', 'Wadgaon Sheri', 'Narhe', 'Camp Area', 'Wanowrie', 'Karve Nagar', 'NIBM Road', 'Hadapsar', 'Pimple Nilakh', 'Bavdhan', 'Pashan', 'Yerawada', 'Pimple Gurav', 'Balewadi', 'Salunkhe Vihar Road', 'Warje', 'Bhosari', 'Chandan Nagar', 'Lohegaon', 'Pune-Solapur Road', 'Dhanori', 'Vishrantwadi', 'Akurdi'];
    const kitchenTypeOptions = ['Dine in', 'Cloud Kitchen'];
    const parkingInfoOptions = ['Yes', 'No'];
    const franchiseInfoOptions = ['Independent', 'Franchise'];


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
                <header>
                    <div className="headerSection">
                        <div className="logoAndName">
                            <img src={logo} className='w-16' alt="logo">
                            </img>
                            <h1>BE Project App</h1>
                        </div>
                        <div className="invoiceDetails">
                            <p className='hHeader'>Confirmation</p>
                        </div>
                    </div>
                    <hr />
                    <div className="headerSection">
                        <div>
                            <p>
                                <a href="mailto:clientname@clientwebsite.com">
                                    arya@gmail.com
                                </a>
                                <br />
                            </p>
                        </div>
                    </div>
                </header>

                <p>Location: {selectedOption}</p>
                <p>Area: {formData.area}</p>
                <p>Parking Info: {selectedOption4}</p>
                <p>Timings: {selectedOption6}</p>
                <p>Cuisine: {selectedOption2}</p>
                <p>Cuisine Type: {selectedOption7} </p>
                <p>Kitchen Type: {selectedOption3}</p>
                <p>Fixed Capital: {formData.fixedCapital}</p>
                <p>Variable Capital: {formData.variableCapital}</p>
                <p>Franchise Info: {selectedOption5}</p>

                <button id="previousButton" className='pButton' onClick={lastPrevStep}>Previous</button>
                <button id="downloadButton" className='pButton' onClick={downloadPDF}>Download</button>
                <button id="lgButton" className='logoutButton' onClick={handleLogout}>Logout</button>


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
                        <button className="nButton" onClick={() => toggleDropdown('timings')}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption6}
                        </button>
                        {isOpen5 && (
                            <ul className="dropdown-menu">
                                {timingsItems.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option, 'timings')}
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
                                {items.map((option, index) => (
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

                        <button className="nButton" onClick={() => toggleDropdown('cuisineTypes')}>
                            <img className='imgDrop' src='https://img.icons8.com/?size=100&id=26139&format=png&color=000000' alt='dd'>
                            </img>
                            {selectedOption7}
                        </button>
                        {isOpen6 && (
                            <ul className="dropdown-menu">
                                {cuisineTypesItems.map((option, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleOptionClick(option, 'cuisineTypes')}
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
