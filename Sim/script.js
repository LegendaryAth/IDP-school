document.addEventListener('DOMContentLoaded', function () {
    let score = 0;
    let carbonFootprint = 0;
    let energyUsage = 0;
    let wasteProduction = 0;

    const scoreElement = document.getElementById('score');
    const airQualityElement = document.getElementById('airQuality');
    const waterQualityElement = document.getElementById('waterQuality');
    const wildlifeDiversityElement = document.getElementById('wildlifeDiversity');
    const carbonFootprintElement = document.getElementById('carbonFootprint');
    const energyUsageElement = document.getElementById('energyUsage');
    const wasteProductionElement = document.getElementById('wasteProduction');

    const plantTreesBtn = document.getElementById('plantTreesBtn');
    const reducePollutionBtn = document.getElementById('reducePollutionBtn');
    const adoptRenewablesBtn = document.getElementById('adoptRenewablesBtn');

    let cooldowns = {
        plantTrees: false,
        reducePollution: false,
        adoptRenewables: false
    };

    const cooldownTime = 10000; // 10 seconds cooldown for each action

    document.querySelectorAll('area').forEach(region => {
        region.addEventListener('click', function () {
            loadQuiz(region.dataset.region);
            openQuiz();
        });
    });

    plantTreesBtn.addEventListener('click', function () {
        if (!cooldowns.plantTrees) {
            updateScore(10);
            updateCarbonFootprint(-5);
            updateAirQuality('Improved');
            startCooldown('plantTrees');
        }
    });

    reducePollutionBtn.addEventListener('click', function () {
        if (!cooldowns.reducePollution) {
            updateScore(15);
            updateWasteProduction(-5);
            updateAirQuality('Great');
            startCooldown('reducePollution');
        }
    });

    adoptRenewablesBtn.addEventListener('click', function () {
        if (!cooldowns.adoptRenewables) {
            updateScore(20);
            updateEnergyUsage(-10);
            updateAirQuality('Excellent');
            startCooldown('adoptRenewables');
        }
    });

    function startCooldown(action) {
        cooldowns[action] = true;
        const button = getButtonByAction(action);
        button.disabled = true;
        button.classList.add('cooldown');

        setTimeout(() => {
            cooldowns[action] = false;
            button.disabled = false;
            button.classList.remove('cooldown');
        }, cooldownTime);
    }

    function getButtonByAction(action) {
        switch (action) {
            case 'plantTrees': return plantTreesBtn;
            case 'reducePollution': return reducePollutionBtn;
            case 'adoptRenewables': return adoptRenewablesBtn;
            default: return null;
        }
    }

    function updateScore(points) {
        score += points;
        scoreElement.textContent = score;
    }

    function updateCarbonFootprint(amount) {
        carbonFootprint += amount;
        carbonFootprintElement.textContent = carbonFootprint < 0 ? 'Low' : 'High';
    }

    function updateEnergyUsage(amount) {
        energyUsage += amount;
        energyUsageElement.textContent = energyUsage < 0 ? 'Sustainable' : 'Excessive';
    }

    function updateWasteProduction(amount) {
        wasteProduction += amount;
        wasteProductionElement.textContent = wasteProduction < 0 ? 'Low' : 'High';
    }

    function updateAirQuality(status) {
        airQualityElement.textContent = status;
    }

    function openQuiz() {
        quizModal.style.display = 'flex';
    }

    function closeQuiz() {
        quizModal.style.display = 'none';
    }

    function loadQuiz(region) {
        const quiz = quizzes[region][Math.floor(Math.random() * quizzes[region].length)];
        document.getElementById('quizQuestion').textContent = quiz.question;
        const quizOptions = document.getElementById('quizOptions');
        quizOptions.innerHTML = '';
        quiz.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'quiz-option';
            button.addEventListener('click', () => handleQuizAnswer(region, index === quiz.correct));
            quizOptions.appendChild(button);
        });
    }

    function handleQuizAnswer(region, correct) {
        closeQuiz();
        if (correct) {
            updateScore(10);
        } else {
            updateScore(-5);
        }
    }

    function triggerRandomEvent() {
        const events = [
            {
                description: "A forest fire has broken out!",
                effect: () => {
                    updateScore(-20);
                    updateAirQuality('Poor');
                    updateWildlifeDiversity(-5);
                }
            },
            {
                description: "An oil spill occurred in the ocean.",
                effect: () => {
                    updateScore(-30);
                    updateWaterQuality('Contaminated');
                }
            },
            {
                description: "A severe drought has impacted agriculture.",
                effect: () => {
                    updateScore(-25);
                    updateWaterQuality('Low');
                    updateWildlifeDiversity(-10);
                }
            },
            {
                description: "A new green energy source has been developed!",
                effect: () => {
                    updateScore(30);
                    updateEnergyUsage(-10);
                }
            },
            {
                description: "Massive deforestation has occurred!",
                effect: () => {
                    updateScore(-40);
                    updateAirQuality('Very Poor');
                    updateCarbonFootprint(10);
                }
            }
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        alert(event.description);
        event.effect();
    }

    function updateWaterQuality(status) {
        waterQualityElement.textContent = status;
    }

    function updateWildlifeDiversity(amount) {
        const newDiversity = parseInt(wildlifeDiversityElement.textContent) + amount;
        wildlifeDiversityElement.textContent = newDiversity >= 0 ? 'High' : 'Low';
    }

    setInterval(triggerRandomEvent, 30000); 
});
