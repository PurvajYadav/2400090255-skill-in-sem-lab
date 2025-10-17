import { useState } from 'react'
import Terms from './terms.jsx'
import Customer from './customer.jsx'
import Artisan from './artisan.jsx'
import './Login.css'

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        number: '',
        email: ''
    });
    const [showTerms, setShowTerms] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);
    const [showArtisan, setShowArtisan] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateLogin = () => {
        const validUsername = "Purvaj";
        const validNumber = "8328559744";
        const validEmail = "chennapurvajyadav@gmail.com";

        const artisanUsername = "artisan";
        const artisanNumber = "123";
        const artisanEmail = "artisan@gmail.com";

        if (formData.username === validUsername && 
            formData.number === validNumber && 
            formData.email === validEmail) {
            alert("Customer Login successful!");
            setShowCustomer(true);
        } else if (formData.username === artisanUsername && 
                   formData.number === artisanNumber && 
                   formData.email === artisanEmail) {
            alert("Artisan Login successful!");
            setShowArtisan(true);
        } else {
            alert("Invalid credentials");
        }
    };

    if (showTerms) {
        return <Terms />;
    }

    if (showCustomer) {
        return <Customer />;
    }

    if (showArtisan) {
        return <Artisan />;
    }

    return (
        <div className="app-container">
            <h1>THE CRAFTORA</h1>
            <h2>Welcome to our site. India's premier platform for artisans.</h2>
            <div className="login-form">
                <h2>Login</h2>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Name" 
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="number" 
                    placeholder="Phone Number" 
                    value={formData.number}
                    onChange={handleInputChange}
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={validateLogin}>Submit</button>
            </div>
            
            <div className="policy">
                <h2>Our Policy</h2>
                <p>Customer satisfaction is our priority. Read our <button 
                    onClick={() => setShowTerms(true)}
                    style={{color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer'}}
                >terms and conditions</button>.</p>
            </div>
        </div>
    );
}

export default Login;