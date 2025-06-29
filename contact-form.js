// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.form-submit');
            const buttonText = submitButton.querySelector('span');
            const buttonIcon = submitButton.querySelector('i');
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Show loading state
            buttonText.textContent = 'Sending...';
            buttonIcon.className = 'fas fa-spinner fa-spin';
            submitButton.disabled = true;
            
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Success state
                    buttonText.textContent = 'Message Sent!';
                    buttonIcon.className = 'fas fa-check';
                    submitButton.style.backgroundColor = '#10b981';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        buttonText.textContent = 'Send Message';
                        buttonIcon.className = 'fas fa-paper-plane';
                        submitButton.disabled = false;
                        submitButton.style.backgroundColor = '';
                    }, 3000);
                    
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
                
            } catch (error) {
                console.error('Error:', error);
                
                // Error state
                buttonText.textContent = 'Send Failed';
                buttonIcon.className = 'fas fa-exclamation-triangle';
                submitButton.style.backgroundColor = '#ef4444';
                
                showNotification('Failed to send message. Please try again or contact us directly.', 'error');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    buttonText.textContent = 'Send Message';
                    buttonIcon.className = 'fas fa-paper-plane';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
});

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
