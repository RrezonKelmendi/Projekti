
document.addEventListener('DOMContentLoaded', function() {
    const donateForm = document.getElementById('donateForm');
    const petPhoto = document.getElementById('petPhoto');
    
    if (petPhoto) {
        petPhoto.addEventListener('change', function(e) {
            const files = e.target.files;
            const previewContainer = document.getElementById('imagePreviewContainer');
  
            if (!previewContainer) {
                const container = document.createElement('div');
                container.id = 'imagePreviewContainer';
                container.className = 'image-preview-container';
                petPhoto.parentElement.appendChild(container);
            }

            const existingContainer = document.getElementById('imagePreviewContainer');
            if (existingContainer) {
                existingContainer.innerHTML = '';
            }

            Array.from(files).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewDiv = document.createElement('div');
                        previewDiv.className = 'image-preview';
                        previewDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Preview ${index + 1}">
                            <button type="button" class="remove-image" onclick="removeImagePreview(${index})">×</button> `;
                        existingContainer.appendChild(previewDiv);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    if (donateForm) {
        donateForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                donorName: document.getElementById('donorName').value,
                donorEmail: document.getElementById('donorEmail').value,
                donorPhone: document.getElementById('donorPhone').value,
                donorAddress: document.getElementById('donorAddress').value,
                petName: document.getElementById('petName').value,
                petType: document.getElementById('petType').value,
                petAge: document.getElementById('petAge').value,
                petGender: document.getElementById('petGender').value,
                petDescription: document.getElementById('petDescription').value,
                petHealth: document.getElementById('petHealth').value,
                donationReason: document.getElementById('donationReason').value,
                date: new Date().toISOString()
            };

            if (petPhoto && petPhoto.files.length > 0) {
                formData.photosCount = petPhoto.files.length;

            }
            
            const donations = JSON.parse(localStorage.getItem('donations') || '[]');
            donations.push(formData);
            localStorage.setItem('donations', JSON.stringify(donations));
            
            alert('Kërkesa juaj për dhurim u dërgua me sukses! Do të kontaktoheni së shpejti për konfirmim.');
            
            donateForm.reset();
            const previewContainer = document.getElementById('imagePreviewContainer');
            if (previewContainer) {
                previewContainer.innerHTML = '';
            }
            
            setTimeout(() => {
                window.location.href = 'adoption.html';
            }, 2000);
        });
    }
});

function removeImagePreview(index) {
    const input = document.getElementById('petPhoto');
    if (input) {
        const dt = new DataTransfer();
        const files = Array.from(input.files);
        files.splice(index, 1);
        files.forEach(file => dt.items.add(file));
        input.files = dt.files;
        
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }
}

