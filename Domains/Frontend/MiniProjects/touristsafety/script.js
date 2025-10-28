// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Initialize theme from localStorage or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Map variables
let map;
let markers = [];

// Search Functionality
const searchBtn = document.getElementById('searchBtn');
const areaSearch = document.getElementById('areaSearch');
const safetyDetails = document.getElementById('safetyDetails');

async function searchArea(area) {
    const searchError = document.getElementById('searchError');
    if (!searchError) {
        console.error('Search error element not found');
        return;
    }
    
    searchError.textContent = ''; // Clear any previous errors
    searchError.style.display = 'none';
    
    // Clear previous markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    try {
        console.log('Searching for area:', area);
        const response = await fetch(`http://localhost:3001/api/safety/${encodeURIComponent(area)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        
        const result = await response.json();
        console.log('Received data:', result);

        // Update safety information
        if (safetyDetails) {
            if (result.safetyLevel === 'Unknown') {
                safetyDetails.innerHTML = `
                    <div class="error-message">
                        <p>No safety data available for "${area}".</p>
                        <p>Please try another location in Delhi.</p>
                        <p>Available areas include: Connaught Place, Karol Bagh, Saket, Dwarka, etc.</p>
                    </div>
                `;
                return;
            }

            // Add marker for the searched area
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: area + ', Delhi, India' }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: area
                    });
                    markers.push(marker);
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);
                }
            });

            safetyDetails.innerHTML = `
                <div class="safety-level">
                    <h4>Safety Level: ${result.safetyLevel}</h4>
                    <div class="safety-indicator ${result.safetyLevel.toLowerCase()}"></div>
                </div>
                <div class="safety-details">
                    <p>Number of Police Stations: ${result.policeStations}</p>
                    <p>Crime Rate: ${result.crimeRate}/10</p>
                    <p>Lighting: ${result.lighting}</p>
                    <p>Public Transport: ${result.publicTransport}</p>
                    <p>Emergency Services: ${result.emergencyServices}</p>
                    <p>Last Updated: ${new Date(result.lastUpdated).toLocaleDateString()}</p>
                </div>
            `;

            // Add police station markers
            if (result.policeStations > 0) {
                const center = map.getCenter();
                for (let i = 0; i < result.policeStations; i++) {
                    const policeMarker = new google.maps.Marker({
                        map: map,
                        position: {
                            lat: center.lat() + (Math.random() - 0.5) * 0.02,
                            lng: center.lng() + (Math.random() - 0.5) * 0.02
                        },
                        icon: {
                            url: 'https://maps.google.com/mapfiles/ms/icons/police.png',
                            scaledSize: new google.maps.Size(32, 32)
                        },
                        title: 'Police Station'
                    });
                    markers.push(policeMarker);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching safety data:', error);
        searchError.textContent = 'Error fetching safety data: ' + error.message;
        searchError.style.display = 'block';
        if (safetyDetails) {
            safetyDetails.innerHTML = `
                <div class="error-message">
                    <p>Error fetching safety data. Please try again later.</p>
                    <p>Error details: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Add event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const area = document.getElementById('areaSearch').value.trim();
            if (area) {
                searchArea(area);
            } else {
                const searchError = document.getElementById('searchError');
                if (searchError) {
                    searchError.textContent = 'Please enter an area name.';
                    searchError.style.display = 'block';
                }
            }
        });
    }

    // Add event listener for Enter key in search input
    const areaSearch = document.getElementById('areaSearch');
    if (areaSearch) {
        areaSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const area = e.target.value.trim();
                if (area) {
                    searchArea(area);
                } else {
                    const searchError = document.getElementById('searchError');
                    if (searchError) {
                        searchError.textContent = 'Please enter an area name.';
                    }
                }
            }
        });
    }

    // Navigation state management
    function setActiveNavItem(hash) {
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }

    // Set home as active by default
    setActiveNavItem('#home');
    
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            setActiveNavItem(hash);
        });
    });
});

// AI Chat Functionality
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleEmergencyMessage(message) {
    // In a real application, this would connect to an AI service
    const responses = {
        'help': 'I\'m here to help. Please describe your emergency situation.',
        'police': 'Calling police (100) immediately. Stay calm and provide your location.',
        'ambulance': 'Calling ambulance (102) immediately. Please provide your exact location.',
        'women helpline': 'Connecting you to women helpline (1091). Please stay on the line.',
        'location': 'Please share your current location for immediate assistance.',
        'default': 'I understand this is an emergency. Please call 100 for immediate police assistance. Stay calm and provide your location.'
    };

    const lowerMessage = message.toLowerCase();
    let response = responses.default;

    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            response = value;
            break;
        }
    }

    addMessage(response);
}

sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        handleEmergencyMessage(message);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Add initial bot message
addMessage('Hello! I\'m your emergency assistant. How can I help you?');

// Sidebar and Chat Functionality
// let currentChatFriend = null;
// let isLocationSharing = false;
// let watchId = null;

// Toggle sidebar
// document.getElementById('toggleSidebar').addEventListener('click', () => {
//     document.querySelector('.sidebar').classList.toggle('collapsed');
// });

// Sample friends data (in a real app, this would come from a database)
// const friends = [
//     { id: 1, name: 'Priya Sharma', status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
//     { id: 2, name: 'Anjali Patel', status: 'offline', avatar: 'https://i.pravatar.cc/150?img=2' },
//     { id: 3, name: 'Meera Singh', status: 'online', avatar: 'https://i.pravatar.cc/150?img=3' }
// ];

// Render friends list
// function renderFriendsList() {
//     const friendsList = document.getElementById('friendsList');
//     friendsList.innerHTML = friends.map(friend => `
//         <div class="friend-item" data-id="${friend.id}">
//             <div class="status ${friend.status}"></div>
//             <img src="${friend.avatar}" alt="${friend.name}">
//             <span>${friend.name}</span>
//         </div>
//     `).join('');
//
//     // Add click event to friends
//     document.querySelectorAll('.friend-item').forEach(item => {
//         item.addEventListener('click', () => {
//             const friendId = parseInt(item.dataset.id);
//             const friend = friends.find(f => f.id === friendId);
//             openChat(friend);
//         });
//     });
// }

// Open chat with friend
// function openChat(friend) {
//     currentChatFriend = friend;
//     document.getElementById('chatFriendName').textContent = friend.name;
//     document.getElementById('chatWindow').classList.add('active');
//     // Load chat history here
// }

// Close chat
// document.querySelector('.close-chat').addEventListener('click', () => {
//     document.getElementById('chatWindow').classList.remove('active');
//     currentChatFriend = null;
// });

// Send message
// document.getElementById('sendMessage').addEventListener('click', sendMessage);
// document.getElementById('messageInput').addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') sendMessage();
// });
//
// function sendMessage() {
//     const input = document.getElementById('messageInput');
//     const message = input.value.trim();
//     if (message && currentChatFriend) {
//         const chatMessages = document.getElementById('chatMessages');
//         const messageElement = document.createElement('div');
//         messageElement.className = 'message sent';
//         messageElement.textContent = message;
//         chatMessages.appendChild(messageElement);
//         chatMessages.scrollTop = chatMessages.scrollHeight;
//         input.value = '';
//         // Here you would typically send the message to a server
//     }
// }

// Location sharing
// document.getElementById('shareLocation').addEventListener('click', () => {
//     if (!isLocationSharing) {
//         if (navigator.geolocation) {
//             watchId = navigator.geolocation.watchPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     document.getElementById('locationStatus').textContent = 
//                         `Location shared: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
//                     // Here you would typically send the location to a server
//                 },
//                 (error) => {
//                     console.error('Error getting location:', error);
//                     document.getElementById('locationStatus').textContent = 
//                         'Error sharing location';
//                 }
//             );
//             isLocationSharing = true;
//             document.getElementById('shareLocation').innerHTML = 
//                 '<i class="fas fa-location-arrow"></i> Stop Sharing Location';
//         } else {
//             document.getElementById('locationStatus').textContent = 
//                 'Geolocation is not supported by your browser';
//         }
//     } else {
//         navigator.geolocation.clearWatch(watchId);
//         isLocationSharing = false;
//         document.getElementById('locationStatus').textContent = 'Location sharing stopped';
//         document.getElementById('shareLocation').innerHTML = 
//             '<i class="fas fa-location-arrow"></i> Share My Location';
//     }
// });

// Initialize
// renderFriendsList(); 
// renderFriendsList(); 