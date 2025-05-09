import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // Ensure firebase is initialized in this file
import "./App.css"; // Assume you have all necessary CSS classes defined

const moodOptions = [
  "Happy", "Sad", "Excited", "Tired", "Anxious", 
  "Depressed", "Lonely", "Grateful", "Overwhelmed", 
  "Hopeful", "Angry", "Hungry"
];

const moodColors = {
  Happy: { bg: "#fff8e1", border: "#ffd54f" },
  Sad: { bg: "#e3f2fd", border: "#64b5f6" },
  Excited: { bg: "#f3e5f5", border: "#ba68c8" },
  Tired: { bg: "#e0f7fa", border: "#4dd0e1" },
  Anxious: { bg: "#fce4ec", border: "#f06292" },
  Depressed: { bg: "#e8f5e9", border: "#81c784" },
  Lonely: { bg: "#f5f5f5", border: "#e0e0e0" },
  Grateful: { bg: "#fffde7", border: "#fff176" },
  Overwhelmed: { bg: "#efebe9", border: "#a1887f" },
  Hopeful: { bg: "#e8eaf6", border: "#7986cb" },
  Angry: { bg: "#ffebee", border: "#e57373" },
  Hungry: { bg: "#fbe9e7", border: "#ff8a65" }
};

const responses = {
  Happy: [
    "Your light is contagious. Keep shining 🌟",
    "May your joy ripple outward today 💫",
    "You deserve every bit of this happiness 😊"
  ],
  Sad: [
    "It's okay to feel sad. You're not alone 💙",
    "Take your time. Healing is not rushed 🕊️",
    "Gentle hugs—you're doing better than you think 🤗"
  ],
  Excited: [
    "Go channel that energy into something joyful! 🚀",
    "Your excitement is electric ⚡",
    "Love that spark in you! 🔥"
  ],
  Tired: [
    "You've done enough. Rest isn't weakness 🛌",
    "Permission granted to slow down 🌙",
    "Sometimes the most productive thing is rest 😴"
  ],
  Anxious: [
    "Breathe. Right now, you're safe 💨",
    "One moment at a time—you've survived every one so far 🧘",
    "You are more than your thoughts 🌀"
  ],
  Depressed: [
    "I'm so glad you showed up today. That matters 💛",
    "Please be gentle with yourself right now 🌱",
    "Dark clouds pass—hold on 🌤️"
  ],
  Lonely: [
    "Even when you feel alone, you're thought of 🤍",
    "There are souls who would be lucky to know you 🌍",
    "This feeling won't last forever—promise ☁️"
  ],
  Grateful: [
    "Gratitude opens the door to more ❤️",
    "That's beautiful. Thank you for feeling that 🌼",
    "You just made the world a little lighter 🌈"
  ],
  Overwhelmed: [
    "Too much means you care deeply. Pause and breathe 🧩",
    "Let go of one thing. Then another 🌊",
    "You can't pour from an empty cup ☕"
  ],
  Hopeful: [
    "That spark can light the way for others 🔦",
    "Hope is powerful. Nurture it 🌷",
    "You're blooming—even if you don't see it yet 🌸"
  ],
  Angry: [
    "Anger is valid. Listen to it without letting it steer 🚧",
    "Your emotions are valid, and it's okay to feel them. Take your time.🔥",
    "Breathe through it—your peace matters 🌬️"
  ],
  Hungry: [
    "Your body speaks—honor it 🍲",
    "Refuel with kindness, not guilt 🥗",
    "You deserve nourishment—in all forms 🍞"
  ]
};

const Confetti = () => (
  <>
    {[...Array(10)].map((_, i) => (
      <div 
        key={i} 
        className="confetti" 
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
        }}
      />
    ))}
  </>
);

const ComfortAnimation = () => (
  <div className="comfort-animation">
    <div className="comfort-circle"></div>
    <div className="comfort-circle delay-1"></div>
    <div className="comfort-circle delay-2"></div>
  </div>
);

const CalmAnimation = () => (
  <div className="calm-animation">
    <div className="wave"></div>
    <div className="wave delay-1"></div>
  </div>
);

async function logMoodSelection(selectedMood) {
  try {
 

    await addDoc(collection(db, "moodSelections"), {
      mood: selectedMood,
      timestamp: serverTimestamp(),
      hour: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      month: new Date().getMonth() + 1,
      deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
      location: { latitude, longitude }
    });
  } catch (error) {
    console.error("Error getting location or logging mood:", error);
    await addDoc(collection(db, "moodSelections"), {
      mood: selectedMood,
      timestamp: serverTimestamp(),
      hour: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      month: new Date().getMonth() + 1,
      deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop"
    });
  }
}

export default function App() {
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showComfortAnimation, setShowComfortAnimation] = useState(false);
  const [showCalmAnimation, setShowCalmAnimation] = useState(false);

  useEffect(() => {
    // Still fetch stats, but do nothing with them
    async function fetchMoodStats() {
      await getDocs(collection(db, "moodSelections"));
      // Optional: console.log("Stats fetched, not shown to user.");
    }
    fetchMoodStats();
  }, []);

  function handleChange(event) {
    const selectedMood = event.target.value;
    setMood(selectedMood);
    setShowConfetti(false);
    setShowComfortAnimation(false);
    setShowCalmAnimation(false);

    if (selectedMood && responses[selectedMood]) {
      const messages = responses[selectedMood];
      const random = messages[Math.floor(Math.random() * messages.length)];
      setResponse(random);
      logMoodSelection(selectedMood);

      if (["Happy", "Excited", "Grateful", "Hopeful"].includes(selectedMood)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else if (["Sad", "Lonely", "Depressed"].includes(selectedMood)) {
        setShowComfortAnimation(true);
        setTimeout(() => setShowComfortAnimation(false), 3000);
      } else if (["Angry"].includes(selectedMood)) {
        setShowCalmAnimation(true);
        setTimeout(() => setShowCalmAnimation(false), 3000);
      }
    } else {
      setResponse("");
    }
  }

  return (
    <div className="app-container">
      <div className="main-layout">
        <div className="mood-section">
          <h1>How are you feeling today?</h1>
          <select onChange={handleChange} value={mood} className="mood-select">
            <option value="">-- Select Feeling --</option>
            {moodOptions.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {response && (
            <div 
              className={`response-box fade-in ${mood.toLowerCase()}`}
              style={{
                backgroundColor: moodColors[mood]?.bg || '#e7f4ff',
                borderLeft: `6px solid ${moodColors[mood]?.border || '#59b4d1'}`
              }}
            >
              {response}
              {showConfetti && <div className="confetti-container"><Confetti /></div>}
              {showComfortAnimation && <div className="animation-container"><ComfortAnimation /></div>}
              {showCalmAnimation && <div className="animation-container"><CalmAnimation /></div>}
            </div>
          )}

          <footer>
            <p>Powered by: Tycoon Electricals⚡🔌</p>
            <small>You mental health is your greatest resource</small>
          </footer>
        </div>
      </div>
    </div>
  );
}
