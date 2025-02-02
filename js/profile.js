class ProfileManager {
    constructor() {
        this.profileImage = document.getElementById('profileImage');
        this.technicianName = document.getElementById('technicianName');
        this.technicalSkills = document.getElementById('technicalSkills');
        this.plumbingSkills = document.getElementById('plumbingSkills');
        this.electricalSkills = document.getElementById('electricalSkills');
    }

    loadProfile(user) {
        this.technicianName.textContent = user.name;
        
        // Carica l'immagine del profilo
        if (user.profileImage) {
            this.profileImage.src = user.profileImage;
        } else {
            this.profileImage.src = 'assets/images/default-profile.png';
        }

        // Carica le competenze
        this.renderSkills(this.technicalSkills, user.technicalSkills);
        this.renderSkills(this.plumbingSkills, user.plumbingSkills);
        this.renderSkills(this.electricalSkills, user.electricalSkills);
    }

    renderSkills(container, skills) {
        container.innerHTML = '';
        Object.entries(skills).forEach(([skill, level]) => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            
            const progress = document.createElement('div');
            progress.className = 'skill-progress';
            progress.style.width = `${level}%`;
            
            const label = document.createElement('div');
            label.className = 'skill-label';
            label.textContent = `${skill}: ${level}%`;
            
            skillBar.appendChild(progress);
            skillBar.appendChild(label);
            container.appendChild(skillBar);
        });
    }
} 