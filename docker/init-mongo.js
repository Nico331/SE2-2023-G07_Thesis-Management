db = new Mongo().getDB("mongo_db_se");

db.proposals.insertMany([
    {
        title: "Advanced Robotics Control Systems",
        supervisor: "Prof. Emily White",
        coSupervisors: ["Dr. John Doe", "Dr. Jane Smith"],
        keywords: ["robotics", "control systems", "automation"],
        type: "Development",
        groups: ["RoboTech Group"],
        description: "Design and development of sophisticated control systems for industrial robotics.",
        requiredKnowledge: "C++, ROS, control theory",
        notes: "Experience with robotic arms preferred.",
        expiration: new Date("2022-12-31"),
        level: "PhD",
        cdS: ["Engineering", "Robotics"],
        archived: false
    },
    {
        title: "Blockchain-based Supply Chain Management",
        supervisor: "Dr. Alan Turing",
        coSupervisors: ["Prof. Sarah Connor"],
        keywords: ["blockchain", "supply chain", "distributed ledger"],
        type: "Research",
        groups: ["BlockChain Group"],
        description: "Exploration of blockchain technology to enhance transparency in supply chain management.",
        requiredKnowledge: "Solidity, smart contracts, Ethereum",
        notes: "Prior project work with blockchain platforms is a plus.",
        expiration: new Date("2024-12-31"),
        level: "Masters",
        cdS: ["Computer Science", "Information Systems"],
        archived: false
    },
    {
        title: "Quantum Computing Algorithms for Cryptography",
        supervisor: "Prof. Richard Feynman",
        coSupervisors: [],
        keywords: ["quantum computing", "cryptography", "algorithms"],
        type: "Research",
        groups: ["QuantumAlgo Group"],
        description: "Development of new algorithms for cryptography using quantum computing principles.",
        requiredKnowledge: "Quantum physics, algorithm design, Python",
        notes: "Basic understanding of quantum mechanics is necessary.",
        expiration: new Date("2023-09-31"),
        level: "PhD",
        cdS: ["Physics", "Computer Science"],
        archived: false
    },
    {
        title: "Artificial Intelligence in Healthcare Diagnostics",
        supervisor: "Dr. Lisa Sanders",
        coSupervisors: ["Dr. Eric Foreman"],
        keywords: ["AI", "healthcare", "diagnostics"],
        type: "Application Development",
        groups: ["AIHealth Group"],
        description: "Application of AI techniques to improve accuracy and efficiency in healthcare diagnostics.",
        requiredKnowledge: "Machine learning, Python, medical knowledge",
        notes: "Experience with healthcare data sets is beneficial.",
        expiration: new Date("2023-12-11"),
        level: "Masters",
        cdS: ["Biotechnology", "Health Informatics"],
        archived: false
    },
    {
        title: "Deep Learning for Autonomous Vehicle Navigation",
        supervisor: "Prof. Sebastian Thrun",
        coSupervisors: ["Dr. Chris Urmson"],
        keywords: ["deep learning", "autonomous vehicles", "navigation"],
        type: "Research and Development",
        groups: ["AutoNav Group"],
        description: "Creating deep learning models to solve problems in autonomous vehicle navigation.",
        requiredKnowledge: "TensorFlow, Python, computer vision",
        notes: "Background in transportation engineering is a plus.",
        expiration: new Date("2023-12-31"),
        level: "PhD",
        cdS: ["Artificial Intelligence", "Automotive Engineering"],
        archived: false
    },
    {
        title: "Renewable Energy Systems and Grid Integration",
        supervisor: "Dr. Nikola Tesla",
        coSupervisors: ["Prof. Maria Skłodowska-Curie"],
        keywords: ["renewable energy", "grid integration", "sustainability"],
        type: "Research",
        groups: ["EcoEnergy Group"],
        description: "Research into the integration of renewable energy systems into the current power grid.",
        requiredKnowledge: "Electrical engineering, power systems, MATLAB",
        notes: "Prior experience with solar or wind energy systems is appreciated.",
        expiration: new Date(),
        level: "Masters",
        cdS: ["Electrical Engineering", "Environmental Science"],
        archived: false
    },
    {
        title: "Machine Learning Optimization for E-commerce",
        supervisor: "Prof. Jeff Bezos",
        coSupervisors: [],
        keywords: ["machine learning", "e-commerce", "optimization"],
        type: "Research and Development",
        groups: ["EcommAI Group"],
        description: "Utilizing machine learning to optimize various aspects of e-commerce platforms.",
        requiredKnowledge: "Data analysis, Python, ML frameworks",
        notes: "Strong analytical skills and experience with large data sets required.",
        expiration: new Date("2024-01-31"),
        level: "Masters",
        cdS: ["Business Informatics", "Data Science"],
        archived: false
    },
    {
        title: "VR-based Training Environments for Surgery",
        supervisor: "Dr. Derek Shepherd",
        coSupervisors: ["Dr. Addison Montgomery"],
        keywords: ["virtual reality", "surgical training", "interactive simulation"],
        type: "Development",
        groups: ["MediVR Group"],
        description: "Developing interactive VR environments for training surgeons.",
        requiredKnowledge: "Unity, C#, 3D modeling",
        notes: "Experience with medical simulations is a plus.",
        expiration: new Date("2024-05-31"),
        level: "Masters",
        cdS: ["Medical Technology", "Computer Graphics"],
        archived: false
    },
    {
        title: "Big Data Analytics for Internet of Things (IoT)",
        supervisor: "Prof. James Gosling",
        coSupervisors: ["Dr. Vinton Cerf"],
        keywords: ["big data", "IoT", "analytics"],
        type: "Data Analysis",
        groups: ["IoTData Group"],
        description: "Analysis of large datasets generated by IoT devices to gain insights and improve efficiency.",
        requiredKnowledge: "Hadoop, Spark, IoT protocols",
        notes: "Experience with sensor data and real-time analytics preferred.",
        expiration: new Date("2024-11-31"),
        level: "PhD",
        cdS: ["Information Technology", "Data Analytics"],
        archived: false
    },
    {
        title: "Cybersecurity Measures in Financial Technology",
        supervisor: "Prof. Ada Lovelace",
        coSupervisors: ["Dr. Alan Kay"],
        keywords: ["cybersecurity", "fintech", "risk management"],
        type: "Research",
        groups: ["FinSec Group"],
        description: "Studying and developing advanced cybersecurity measures for financial technology applications.",
        requiredKnowledge: "Cryptography, network security, fintech knowledge",
        notes: "Experience with blockchain or digital payment systems is valuable.",
        expiration: new Date("2024-12-31"),
        level: "Masters",
        cdS: ["Cybersecurity", "Financial Engineering"],
        archived: false
    }
]);

db.students.insertMany([
    {
        id: "4grf45tg6yhg7hj7wrcr",
        surname: "Johnson",
        name: "Michael",
        gender: "Male",
        nationality: "American",
        email: "michael.johnson@example.com",
        codDegree: "CS2021",
        enrollmentYear: 2021,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        id: "rfp34okrf34ofr45rf4gf",
        surname: "Williams",
        name: "Emma",
        gender: "Female",
        nationality: "Canadian",
        email: "emma.williams@example.com",
        codDegree: "ENG2020",
        enrollmentYear: 2020,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        id: "3edi0934tkfr0e9ik34e",
        surname: "Brown",
        name: "James",
        gender: "Male",
        nationality: "British",
        email: "james.brown@example.co.uk",
        codDegree: "ME2022",
        enrollmentYear: 2022,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        id: "3fro309eodk40tf9i5f4",
        surname: "Davis",
        name: "Olivia",
        gender: "Female",
        nationality: "Australian",
        email: "olivia.davis@example.com.au",
        codDegree: "BA2021",
        enrollmentYear: 2021,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        id: "43f09f54r0dpof4pfkg",
        surname: "Miller",
        name: "Ethan",
        gender: "Male",
        nationality: "American",
        email: "ethan.miller@example.com",
        codDegree: "AI2023",
        enrollmentYear: 2023,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    }
]);

db.professors.insertMany([
    {
        name: "Elizabeth",
        surname: "Taylor",
        email: "elizabeth.taylor@university.edu",
        codGroup: "MATH-CG",
        codDepartment: "MATH-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        name: "John",
        surname: "Smith",
        email: "john.smith@university.edu",
        codGroup: "PHYS-CG",
        codDepartment: "PHYS-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        name: "Susan",
        surname: "Brown",
        email: "susan.brown@university.edu",
        codGroup: "CHEM-CG",
        codDepartment: "CHEM-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        name: "Robert",
        surname: "Wilson",
        email: "robert.wilson@university.edu",
        codGroup: "COMP-CG",
        codDepartment: "COMP-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        name: "Patricia",
        surname: "Garcia",
        email: "patricia.garcia@university.edu",
        codGroup: "BIO-CG",
        codDepartment: "BIO-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    }
]);

db.degrees.insertMany([
    {
        codDegree: "MLAI-01",
        titleDegree: "MSc in Machine Learning and Artificial Intelligence"
    },
    {
        codDegree: "SWDEV-02",
        titleDegree: "BSc in Software Development"
    },
    {
        codDegree: "DATAMIN-03",
        titleDegree: "PhD in Data Mining and Big Data Analytics"
    },
    {
        codDegree: "ROBOENG-04",
        titleDegree: "MSc in Robotics Engineering"
    },
    {
        codDegree: "CYBERSEC-05",
        titleDegree: "MSc in Cybersecurity"
    },
    {
        codDegree: "DATASCI-06",
        titleDegree: "BSc in Data Science"
    },
    {
        codDegree: "BIOTECH-07",
        titleDegree: "MSc in Biotechnology"
    },
    {
        codDegree: "MEDINF-08",
        titleDegree: "MSc in Medical Informatics"
    },
    {
        codDegree: "NETSYS-09",
        titleDegree: "BSc in Network Systems"
    },
    {
        codDegree: "ENVECO-10",
        titleDegree: "PhD in Environmental Economics"
    }
]);

const studentIds = [
    "3edi0934tkfr0e9ik34e",
    "3fro309eodk40tf9i5f4",
    "43f09f54r0dpof4pfkg",
    "rfp34okrf34ofr45rf4gf",
    "4grf45tg6yhg7hj7wrcr"
];

const courseCodes = ["INF001", "MAT002", "ENG003", "HIS004", "PHY005", "CHE006", "BIO007", "ECO008", "LAW009", "MED010"];

const courseTitles = {
    "INF001": "Introduction to Information Technology",
    "MAT002": "Advanced Mathematics",
    "ENG003": "English Literature",
    "HIS004": "Modern History",
    "PHY005": "Physics Fundamentals",
    "CHE006": "Organic Chemistry",
    "BIO007": "Molecular Biology",
    "ECO008": "Economics Principles",
    "LAW009": "Corporate Law",
    "MED010": "Human Anatomy"
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate() {
    const endDate = new Date('2023-11-07').getTime();
    const startDate = new Date('2018-01-01').getTime();
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    return randomDate.toISOString().split('T')[0]; // Returns the date in "yyyy-mm-dd" format
}

const careers = [];

for (let i = 0; i < 50; i++) {
    const codCourse = getRandomElement(courseCodes);
    const titleCourse = courseTitles[codCourse];
    const career = {
        studentId: getRandomElement(studentIds),
        codCourse: codCourse,
        titleCourse: titleCourse,
        cfu: Math.floor(Math.random() * 7) + 6, // Random CFU between 3 and 15
        grade: Math.floor(Math.random() * 14) + 18, // Random grade between 1 and 30
        date: getRandomDate(),
    };
    careers.push(career);
}

db.careers.insertMany(careers);
