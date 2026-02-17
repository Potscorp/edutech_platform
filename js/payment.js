let selectedPaymentMethod = 'card';

function selectPayment(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('active'));
    event.target.closest('.payment-method').classList.add('active');
}

function handlePayment(event) {
    event.preventDefault();
    
    // Simulate payment processing
    const btn = event.target.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    
    setTimeout(() => {
        // Save payment record
        const payments = JSON.parse(localStorage.getItem('adminPayments')) || [];
        payments.push({
            id: Date.now(),
            user: 'Current User',
            course: 'Complete Web Development Bootcamp',
            amount: '54.99',
            status: 'completed',
            date: new Date().toLocaleDateString(),
            method: selectedPaymentMethod
        });
        localStorage.setItem('adminPayments', JSON.stringify(payments));
        
        alert('Payment successful! You now have access to the course.');
        window.location.href = 'course-player.html';
    }, 2000);
}

// Format card number
document.querySelector('input[placeholder="1234 5678 9012 3456"]')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Format expiry date
document.querySelector('input[placeholder="MM/YY"]')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});
