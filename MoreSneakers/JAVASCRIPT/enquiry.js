// Complete JavaScript functionality for MoreSneakers Enquiry Form
document.addEventListener('DOMContentLoaded', function() {
    console.log('MoreSneakers Enquiry Form loaded successfully');
    
    // Initialize all functionality
    initFormValidation();
    initDynamicFields();
    initModalFunctionality();
    
    console.log('All enquiry form functionality initialized');
    
    // ===== FORM VALIDATION =====
    function initFormValidation() {
        const form = document.getElementById('enquiryForm');
        const submitBtn = document.getElementById('submitBtn');
        
        if (!form) {
            console.error('Enquiry form not found');
            return;
        }
        
        // Real-time validation for all fields
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
        
        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            } else {
                showFormError('Please correct the errors before submitting.');
            }
        });
        
        // Form reset handler
        form.addEventListener('reset', function() {
            clearAllErrors();
            resetDynamicFields();
        });
    }
    
    function validateForm() {
        let isValid = true;
        const form = document.getElementById('enquiryForm');
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate each required field
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        // Validate dynamic fields based on enquiry type
        const enquiryType = document.getElementById('enquiryType').value;
        if (enquiryType) {
            const dynamicValidation = validateDynamicFields(enquiryType);
            if (!dynamicValidation.isValid) {
                isValid = false;
                dynamicValidation.errors.forEach(error => {
                    showFieldError(error.field, error.message);
                });
            }
        }
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Skip validation if field is not required and empty
        if (!field.hasAttribute('required') && value === '') {
            clearFieldError(e);
            return true;
        }
        
        switch(fieldName) {
            case 'firstName':
            case 'lastName':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'This field is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Must be at least 2 characters long';
                } else if (!/^[a-zA-Z\s\-']+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Only letters, spaces, hyphens, and apostrophes are allowed';
                }
                break;
                
            case 'email':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Email address is required';
                } else if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
                if (value !== '' && !isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
                
            case 'enquiryType':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Please select an enquiry type';
                }
                break;
                
            case 'message':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Please enter your message';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
                
            case 'terms':
                if (!field.checked) {
                    isValid = false;
                    errorMessage = 'You must agree to the terms and conditions';
                }
                break;
        }
        
        // Update field appearance and error message
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            clearFieldError(e);
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            showFieldError(fieldName, errorMessage);
        }
        
        return isValid;
    }
    
    function clearFieldError(e) {
        const field = e.target;
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        field.classList.remove('error');
    }
    
    function clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(element => {
            element.textContent = '';
        });
        
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
    
    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function showFormError(message) {
        // Create temporary form-level error message
        const form = document.getElementById('enquiryForm');
        let formError = document.getElementById('formError');
        
        if (!formError) {
            formError = document.createElement('div');
            formError.id = 'formError';
            formError.className = 'error-message form-error';
            formError.style.textAlign = 'center';
            formError.style.marginBottom = '20px';
            formError.style.padding = '10px';
            formError.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            formError.style.borderRadius = '6px';
            formError.style.border = '1px solid var(--error-color)';
            form.insertBefore(formError, form.firstChild);
        }
        
        formError.textContent = message;
        
        // Scroll to error message
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (formError && formError.parentNode) {
                formError.parentNode.removeChild(formError);
            }
        }, 5000);
    }
    
    // ===== DYNAMIC FIELDS =====
    function initDynamicFields() {
        const enquiryType = document.getElementById('enquiryType');
        
        if (enquiryType) {
            enquiryType.addEventListener('change', function() {
                updateDynamicFields(this.value);
            });
            
            // Initialize dynamic fields based on current selection
            updateDynamicFields(enquiryType.value);
        }
    }
    
    function updateDynamicFields(enquiryType) {
        const dynamicFields = document.getElementById('dynamicFields');
        
        if (!dynamicFields) return;
        
        // Clear existing dynamic fields
        dynamicFields.innerHTML = '';
        
        // Add fields based on enquiry type
        switch(enquiryType) {
            case 'product':
                dynamicFields.innerHTML = `
                    <div class="form-group dynamic-field">
                        <label for="productInterest">Product of Interest</label>
                        <select id="productInterest" name="productInterest">
                            <option value="">Select a product category</option>
                            <option value="running">Running Shoes</option>
                            <option value="basketball">Basketball Shoes</option>
                            <option value="lifestyle">Lifestyle Sneakers</option>
                            <option value="limited">Limited Editions</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group dynamic-field">
                        <label for="sizeRange">Size Range (if applicable)</label>
                        <input type="text" id="sizeRange" name="sizeRange" placeholder="e.g., US 7-12">
                    </div>
                `;
                break;
                
            case 'pricing':
                dynamicFields.innerHTML = `
                    <div class="form-group dynamic-field">
                        <label for="budgetRange" class="required">Budget Range</label>
                        <select id="budgetRange" name="budgetRange" required>
                            <option value="">Select budget range</option>
                            <option value="under-1000">Under R1,000</option>
                            <option value="1000-2500">R1,000 - R2,500</option>
                            <option value="2500-5000">R2,500 - R5,000</option>
                            <option value="over-5000">Over R5,000</option>
                        </select>
                        <div class="error-message" id="budgetRangeError"></div>
                    </div>
                    <div class="form-group dynamic-field">
                        <label for="urgency">Urgency</label>
                        <select id="urgency" name="urgency">
                            <option value="">Select urgency</option>
                            <option value="immediate">Immediate (within 24 hours)</option>
                            <option value="soon">Soon (within a week)</option>
                            <option value="flexible">Flexible (no specific timeframe)</option>
                        </select>
                    </div>
                `;
                break;
                
            case 'wholesale':
                dynamicFields.innerHTML = `
                    <div class="form-group dynamic-field">
                        <label for="orderQuantity" class="required">Estimated Order Quantity</label>
                        <input type="number" id="orderQuantity" name="orderQuantity" min="1" placeholder="e.g., 50" required>
                        <div class="error-message" id="orderQuantityError"></div>
                    </div>
                    <div class="form-group dynamic-field">
                        <label for="businessType">Business Type</label>
                        <select id="businessType" name="businessType">
                            <option value="">Select business type</option>
                            <option value="retail">Retail Store</option>
                            <option value="online">Online Store</option>
                            <option value="corporate">Corporate Gifting</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                `;
                break;
                
            case 'sponsorship':
                dynamicFields.innerHTML = `
                    <div class="form-group dynamic-field">
                        <label for="eventType">Event/Organization Type</label>
                        <select id="eventType" name="eventType">
                            <option value="">Select type</option>
                            <option value="sports">Sports Event</option>
                            <option value="community">Community Event</option>
                            <option value="charity">Charity Organization</option>
                            <option value="education">Educational Institution</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group dynamic-field">
                        <label for="eventDate">Event Date (if applicable)</label>
                        <input type="date" id="eventDate" name="eventDate">
                    </div>
                `;
                break;
                
            case 'partnership':
                dynamicFields.innerHTML = `
                    <div class="form-group dynamic-field">
                        <label for="partnershipType" class="required">Partnership Type</label>
                        <select id="partnershipType" name="partnershipType" required>
                            <option value="">Select partnership type</option>
                            <option value="brand">Brand Collaboration</option>
                            <option value="distribution">Distribution Partnership</option>
                            <option value="marketing">Marketing Partnership</option>
                            <option value="other">Other</option>
                        </select>
                        <div class="error-message" id="partnershipTypeError"></div>
                    </div>
                    <div class="form-group dynamic-field">
                        <label for="annualRevenue">Annual Revenue (optional)</label>
                        <select id="annualRevenue" name="annualRevenue">
                            <option value="">Select revenue range</option>
                            <option value="under-1m">Under R1 million</option>
                            <option value="1m-5m">R1-5 million</option>
                            <option value="5m-10m">R5-10 million</option>
                            <option value="over-10m">Over R10 million</option>
                        </select>
                    </div>
                `;
                break;
        }
        
        // Add event listeners to new dynamic fields
        const newFields = dynamicFields.querySelectorAll('input, select, textarea');
        newFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
    }
    
    function validateDynamicFields(enquiryType) {
        const result = {
            isValid: true,
            errors: []
        };
        
        switch(enquiryType) {
            case 'pricing':
                const budgetRange = document.getElementById('budgetRange');
                if (budgetRange && budgetRange.hasAttribute('required') && !budgetRange.value) {
                    result.isValid = false;
                    result.errors.push({
                        field: 'budgetRange',
                        message: 'Budget range is required'
                    });
                }
                break;
                
            case 'wholesale':
                const orderQuantity = document.getElementById('orderQuantity');
                if (orderQuantity && orderQuantity.hasAttribute('required')) {
                    if (!orderQuantity.value) {
                        result.isValid = false;
                        result.errors.push({
                            field: 'orderQuantity',
                            message: 'Order quantity is required'
                        });
                    } else if (orderQuantity.value < 1) {
                        result.isValid = false;
                        result.errors.push({
                            field: 'orderQuantity',
                            message: 'Order quantity must be at least 1'
                        });
                    }
                }
                break;
                
            case 'partnership':
                const partnershipType = document.getElementById('partnershipType');
                if (partnershipType && partnershipType.hasAttribute('required') && !partnershipType.value) {
                    result.isValid = false;
                    result.errors.push({
                        field: 'partnershipType',
                        message: 'Partnership type is required'
                    });
                }
                break;
        }
        
        return result;
    }
    
    function resetDynamicFields() {
        const enquiryType = document.getElementById('enquiryType');
        if (enquiryType) {
            updateDynamicFields(enquiryType.value);
        }
    }
    
    // ===== MODAL FUNCTIONALITY =====
    function initModalFunctionality() {
        const modal = document.getElementById('responseModal');
        const closeModal = document.getElementById('closeModal');
        const modalOkBtn = document.getElementById('modalOkBtn');
        
        if (!modal) return;
        
        // Close modal handlers
        if (closeModal) {
            closeModal.addEventListener('click', closeResponseModal);
        }
        
        if (modalOkBtn) {
            modalOkBtn.addEventListener('click', closeResponseModal);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeResponseModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeResponseModal();
            }
        });
    }
    
    function showResponseModal(type, title, message) {
        const modal = document.getElementById('responseModal');
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        
        if (!modal) return;
        
        // Set modal content based on type
        switch(type) {
            case 'success':
                modalIcon.innerHTML = '✅';
                modalIcon.style.color = 'var(--success-color)';
                break;
            case 'error':
                modalIcon.innerHTML = '❌';
                modalIcon.style.color = 'var(--error-color)';
                break;
            case 'warning':
                modalIcon.innerHTML = '⚠️';
                modalIcon.style.color = 'var(--warning-color)';
                break;
            default:
                modalIcon.innerHTML = 'ℹ️';
                modalIcon.style.color = 'var(--primary-color)';
        }
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeResponseModal() {
        const modal = document.getElementById('responseModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // ===== FORM SUBMISSION =====
    function submitForm() {
        const form = document.getElementById('enquiryForm');
        const submitBtn = document.getElementById('submitBtn');
        const formData = new FormData(form);
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Process form data
            const enquiryData = {
                enquiryType: formData.get('enquiryType'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') === 'on',
                timestamp: new Date().toISOString()
            };
            
            // Add dynamic fields based on enquiry type
            const enquiryType = formData.get('enquiryType');
            switch(enquiryType) {
                case 'product':
                    enquiryData.productInterest = formData.get('productInterest');
                    enquiryData.sizeRange = formData.get('sizeRange');
                    break;
                case 'pricing':
                    enquiryData.budgetRange = formData.get('budgetRange');
                    enquiryData.urgency = formData.get('urgency');
                    break;
                case 'wholesale':
                    enquiryData.orderQuantity = formData.get('orderQuantity');
                    enquiryData.businessType = formData.get('businessType');
                    break;
                case 'sponsorship':
                    enquiryData.eventType = formData.get('eventType');
                    enquiryData.eventDate = formData.get('eventDate');
                    break;
                case 'partnership':
                    enquiryData.partnershipType = formData.get('partnershipType');
                    enquiryData.annualRevenue = formData.get('annualRevenue');
                    break;
            }
            
            // Log the submission (in production, send to server)
            console.log('Enquiry submitted:', enquiryData);
            
            // Generate response based on enquiry type
            const response = generateResponse(enquiryData);
            
            // Show success modal
            showResponseModal('success', response.title, response.message);
            
            // Reset form and loading state
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            clearAllErrors();
            resetDynamicFields();
            
            // Track successful submission
            trackFormSubmission(enquiryData);
            
        }, 2000); // Simulate network delay
    }
    
    function generateResponse(enquiryData) {
        let title = 'Enquiry Submitted Successfully!';
        let message = `Thank you ${enquiryData.firstName}, we have received your ${getEnquiryTypeLabel(enquiryData.enquiryType)} enquiry. `;
        
        switch(enquiryData.enquiryType) {
            case 'product':
                message += 'Our product specialist will contact you within 24 hours with detailed information about our sneaker collection.';
                break;
            case 'pricing':
                message += 'Our sales team will provide you with competitive pricing and availability information within 1 business day.';
                break;
            case 'wholesale':
                message += 'Our wholesale department will review your request and contact you within 2 business days with bulk pricing and terms.';
                break;
            case 'sponsorship':
                message += 'Our partnership team will review your sponsorship request and get back to you within 3-5 business days.';
                break;
            case 'partnership':
                message += 'Our business development team will contact you to discuss potential partnership opportunities within 2 business days.';
                break;
            default:
                message += 'Our team will review your enquiry and get back to you within 24 hours.';
        }
        
        if (enquiryData.newsletter) {
            message += ' You have been subscribed to our newsletter.';
        }
        
        return { title, message };
    }
    
    function getEnquiryTypeLabel(type) {
        const types = {
            'product': 'product information',
            'pricing': 'pricing and availability',
            'wholesale': 'wholesale order',
            'sponsorship': 'sponsorship opportunity',
            'partnership': 'business partnership',
            'other': 'general'
        };
        return types[type] || type;
    }
    
    function trackFormSubmission(data) {
        // In production, send to analytics service
        console.log('Form submission tracked:', {
            category: 'Enquiry Form',
            action: 'Submission',
            label: data.enquiryType
        });
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Enquiry',
                'event_label': data.enquiryType
            });
        }
    }
    
    // ===== UTILITY FUNCTIONS =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic phone validation - accepts various formats
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error in enquiry form:', e.error);
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        isValidEmail,
        isValidPhone
    };
}