document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const miles = parseFloat(document.getElementById('miles').value);
    const electricity = parseFloat(document.getElementById('electricity').value);
    const gas = parseFloat(document.getElementById('gas').value);

    // Sample calculation (for demonstration purposes)
    const carbonFootprint = (miles * 0.411) + (electricity * 0.233) + (gas * 11.7); // Emission factors are fictional

    document.getElementById('footprint').innerText = `Your estimated annual carbon footprint is ${carbonFootprint.toFixed(2)} kg CO2e.`;
    
    // Specialized Feedback
    let feedback = '';
    if (carbonFootprint < 5000) {
        feedback = 'Great job! Your carbon footprint is lower than average. Keep up the eco-friendly habits!';
    } else if (carbonFootprint >= 5000 && carbonFootprint <= 15000) {
        feedback = 'Your carbon footprint is about average. There’s room for improvement; consider reducing car travel and conserving energy.';
    } else {
        feedback = 'Your carbon footprint is higher than average. Try reducing energy use, driving less, and exploring renewable energy options.';
    }

    document.getElementById('feedback').innerText = feedback;
    document.getElementById('result').classList.remove('hidden');
});
