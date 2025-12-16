
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value,
                date: new Date().toISOString()
            };
            
            
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            alert('Mesazhi juaj u dërgua me sukses! Do t\'ju përgjigjemi së shpejti.');
            
            
            contactForm.reset();
        });
    }
    
    
    const inputs = document.querySelectorAll('.animated-form input, .animated-form textarea');
    inputs.forEach((input, index) => {
        input.style.animationDelay = `${index * 0.1}s`;
    });
});

