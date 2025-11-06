# GlowBot - AI-Powered Beauty & Skincare Advisor

An intelligent, minimalist beauty chatbot built with React and powered by Groq's AI. GlowBot provides personalized skincare routines, home remedies, and self-care guidance with a beautiful pastel-themed UI.

## ✨ Features

### Core Features
- **AI-Powered Skincare Guidance**: Personalized skincare routines for all skin types (oily, dry, sensitive, combination)
- **Home Remedies**: Natural, accessible ingredient suggestions using common household items
- **Product Recommendations**: Honest beauty product suggestions based on skin type and concerns
- **Self-Care Tips**: Wellness guidance, meditation reminders, hydration tips, and more
- **Session-Based Conversations**: Continuous chat history during your session
- **New Chat Sessions**: Start fresh conversations anytime

### User Interface
- **Minimalist Pastel Design**: Soft pink (#FADADD), peach (#FFE5B4), lavender, and mint green color scheme
- **Beautiful Homepage**: Features showcase, skincare routines, self-care tips, and FAQ
- **Responsive Chat Interface**: Clean, modern design with soft gradient message bubbles
- **Enter Key Support**: Send messages instantly by pressing Enter
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Beautiful transitions and floating effects for spa-like experience

### Navigation
- **Back to Home**: Navigate back to the homepage anytime
- **New Chat Button**: Create fresh conversations instantly
- **Sticky Header**: Quick access to all features

## 🌸 Skincare & Beauty Content

### Skincare Routines
GlowBot provides step-by-step routines:
- **Morning Routine**: Cleanser → Toner → Moisturizer → Sunscreen
- **Evening Routine**: Cleanser → Treatment → Night Cream
- **Weekly Care**: Masks, scrubs, and relaxation practices

### Home Remedies
- Honey and lemon masks
- Aloe vera treatments
- Cucumber compress for dark circles
- Natural exfoliants and moisturizers
- Plant-based ingredients readily available at home

### Product Recommendations
- Budget-friendly options
- Natural and organic products
- Skin type specific suggestions
- Links and price ranges included

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Groq API Key (get free API key at https://groq.com)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/GlowBot.git
cd GlowBot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Groq API Key**
Update the API key in `server.js`:
```javascript
const GROQ_API_KEY = process.env.GROQ_API_KEY || "your-groq-api-key-here";
```

### Running the Application

1. **Start the backend server** (in one terminal)
```bash
node server.js
```
The server will run on `http://localhost:5000`

2. **Start the React frontend** (in another terminal)
```bash
npm start
```
The app will open at `http://localhost:3000`

## 📁 Project Structure

```
GlowBot/
├── public/
│   └── index.html                 # Main HTML file
├── src/
│   ├── components/
│   │   ├── HomePage.js            # Landing page with features
│   │   ├── ChatWindow.js          # Chat message display
│   │   ├── InputBox.js            # Message input field
│   │   └── MessageBubble.js       # Individual message component
│   ├── styles/
│   │   ├── App.css                # App container styles
│   │   ├── HomePage.css           # Homepage with pastel theme
│   │   ├── ChatWindow.css         # Chat window styles
│   │   ├── InputBox.css           # Input field styles
│   │   ├── MessageBubble.css      # Message bubble styles
│   │   └── index.css              # Global styles
│   ├── App.js                     # Main app component
│   └── index.js                   # React entry point
├── server.js                      # Backend with Groq API
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🔧 API Endpoints

### `/api/chat` (POST)
Sends a message to the beauty chatbot.

**Request:**
```json
{
  "message": "Create a morning routine for oily skin"
}
```

**Response:**
```json
{
  "text": "Here's a perfect morning routine for oily skin..."
}
```

### `/api/new-chat` (POST)
Creates a fresh chat session.

**Response:**
```json
{
  "status": "New chat session created"
}
```

## 🎨 Design Features

### Color Scheme (Pastel Theme)
- **Primary Colors**: Blush Pink (#FADADD), Peach (#FFE5B4)
- **Secondary Colors**: Mint Green (#C8E6C9), Soft Lavender (#E6E6FA)
- **Background**: Off-white (#FFF9F9)
- **Text**: Dark Gray (#333333)
- **Accent**: Subtle gradients (pink → peach)

### Typography
- **Headlines**: Montserrat (Bold, 700)
- **Body Text**: Roboto (Regular, 500)
- **Responsive sizing** across all devices

### Animations
- **Floating Elements**: Smooth up-and-down motion
- **Fade-in Messages**: Messages appear smoothly
- **Hover Effects**: Interactive buttons with transforms
- **Slide-up Entrance**: Components animate in when loaded

## 💬 Usage Examples

### Example 1: Skincare Routine
**User**: "Create a morning routine for dry skin"
**GlowBot**: Provides step-by-step routine with emojis and natural ingredient suggestions

### Example 2: Home Remedy
**User**: "Home remedy for acne?"
**GlowBot**: Suggests honey masks, tea tree oil, aloe vera with application instructions

### Example 3: Wellness Tip
**User**: "How to improve my skin health?"
**GlowBot**: Includes skincare, hydration, sleep, meditation, and diet tips

## ⚠️ Important Disclaimers

- **Not Medical Advice**: GlowBot provides beauty and wellness guidance, not medical diagnosis
- **Patch Testing**: Always test new ingredients on a small patch of skin first
- **Professional Consultation**: For skin diseases, infections, or persistent issues, consult a dermatologist
- **Individual Variation**: Everyone's skin reacts differently; results may vary

## 🛠️ Technology Stack

- **Frontend**: React 18.0.0
- **Backend**: Express 5.1.0
- **AI Model**: Groq AI (Mixtral-8x7b)
- **Styling**: CSS3 with Glassmorphism and Gradients
- **API**: Groq REST API
- **Package Manager**: npm

## 🔐 Privacy & Security

- **No Data Storage**: Chat history is not permanently stored
- **Session-Based**: Each conversation starts fresh
- **Secure Communication**: All API calls use HTTPS
- **Privacy First**: Your beauty preferences stay private

## 📱 Responsive Breakpoints

- **Desktop**: Full-width layouts with optimized spacing
- **Tablet**: Adjusted layout and font sizes
- **Mobile**: Single-column layout with touch-optimized buttons

## 🧠 Chatbot Capabilities

GlowBot can:
- Create personalized skincare routines
- Suggest home remedies for beauty concerns
- Recommend products based on skin type
- Provide makeup and styling tips
- Offer wellness and self-care guidance
- Include beauty affirmations and motivation
- Guide proper ingredient usage and application

### Restricted Topics
GlowBot politely declines and recommends professional consultation for:
- Medical skin conditions (eczema, psoriasis, infections)
- Prescription medications
- Severe or persistent skin issues
- Medical diagnoses

## 🚀 Deployment

### Building for Production
```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Server Deployment
The `server.js` can be deployed to:
- Heroku
- AWS Lambda
- Google Cloud Run
- Azure App Service
- DigitalOcean
- Any Node.js hosting platform

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add YourFeature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Provide detailed description of your concern

## 📄 License

MIT License - feel free to use this project

## 🎉 Acknowledgments

- Built with React and modern web technologies
- Powered by Groq AI
- Minimalist pastel design inspired by beauty and wellness
- Special thanks to the open-source community

---

**GlowBot** - Empowering natural beauty and self-care with AI ✨

Last Updated: 2024
