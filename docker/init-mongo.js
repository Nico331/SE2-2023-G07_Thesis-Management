db = new Mongo().getDB("mongo_db_se");

db.proposal.insertMany([
    {
        _id: "1",
        title: "Advanced Robotics Control Systems",
        supervisor: "p300001",
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
        _id: "2",
        title: "Blockchain-based Supply Chain Management",
        supervisor: "p300001",
        coSupervisors: ["Prof. Sarah Connor"],
        keywords: ["blockchain", "supply chain", "distributed ledger"],
        type: "Research",
        groups: ["BlockChain Group"],
        description: "Exploration of blockchain technology to enhance transparency in supply chain management.",
        requiredKnowledge: "Sol_idity, smart contracts, Ethereum",
        notes: "Prior project work with blockchain platforms is a plus.",
        expiration: new Date("2024-12-31"),
        level: "Masters",
        cdS: ["Computer Science", "Information Systems"],
        archived: false
    },
    {
        _id: "3",
        title: "Quantum Computing Algorithms for Cryptography",
        supervisor: "p300001",
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
        _id: "4",
        title: "Artificial Intelligence in Healthcare Diagnostics",
        supervisor: "p300002",
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
        _id: "5",
        title: "Deep Learning for Autonomous Vehicle Navigation",
        supervisor: "p300002",
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
        _id: "6",
        title: "Renewable Energy Systems and Gr_id Integration",
        supervisor: "p300003",
        coSupervisors: ["Prof. Maria Skłodowska-Curie"],
        keywords: ["renewable energy", "gr_id integration", "sustainability"],
        type: "Research",
        groups: ["EcoEnergy Group"],
        description: "Research into the integration of renewable energy systems into the current power gr_id.",
        requiredKnowledge: "Electrical engineering, power systems, MATLAB",
        notes: "Prior experience with solar or wind energy systems is appreciated.",
        expiration: new Date(),
        level: "Masters",
        cdS: ["Electrical Engineering", "Environmental Science"],
        archived: false
    },
    {
        _id: "7",
        title: "Machine Learning Optimization for E-commerce",
        supervisor: "p300001",
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
        _id: "8",
        title: "VR-based Training Environments for Surgery",
        supervisor: "p300004",
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
        _id: "9",
        title: "Big Data Analytics for Internet of Things (IoT)",
        supervisor: "p300005",
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
        _id: "10",
        title: "Cybersecurity Measures in Financial Technology",
        supervisor: "p300005",
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

db.student.insertMany([
    {
        _id: "s300001",
        surname: "Johnson",
        name: "Michael",
        gender: "Male",
        nationality: "American",
        email: "s300001@studenti.polito.it",
        codDegree: "CS2021",
        enrollmentYear: 2021,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "s300002",
        surname: "Williams",
        name: "Emma",
        gender: "Female",
        nationality: "Canadian",
        email: "s300002@studenti.polito.it",
        codDegree: "ENG2020",
        enrollmentYear: 2020,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "s300003",
        surname: "Brown",
        name: "James",
        gender: "Male",
        nationality: "British",
        email: "s300003@studenti.polito.it",
        codDegree: "ME2022",
        enrollmentYear: 2022,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "s300004",
        surname: "Davis",
        name: "Olivia",
        gender: "Female",
        nationality: "Australian",
        email: "s300004@studenti.polito.it",
        codDegree: "BA2021",
        enrollmentYear: 2021,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "s300005",
        surname: "Miller",
        name: "Ethan",
        gender: "Male",
        nationality: "American",
        email: "s300005@studenti.polito.it",
        codDegree: "AI2023",
        enrollmentYear: 2023,
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    }
]);

db.professor.insertMany([
    {
        _id: "p300001",
        name: "Elizabeth",
        surname: "Taylor",
        email: "p300001@polito.it",
        codGroup: "MATH-CG",
        codDepartment: "MATH-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "p300002",
        name: "John",
        surname: "Smith",
        email: "p300002@polito.it",
        codGroup: "PHYS-CG",
        codDepartment: "PHYS-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "p300003",
        name: "Susan",
        surname: "Brown",
        email: "p300003@polito.it",
        codGroup: "CHEM-CG",
        codDepartment: "CHEM-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "p300004",
        name: "Robert",
        surname: "Wilson",
        email: "p300004@polito.it",
        codGroup: "COMP-CG",
        codDepartment: "COMP-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    },
    {
        _id: "p300005",
        name: "Patricia",
        surname: "Garcia",
        email: "p300005@polito.it",
        codGroup: "BIO-CG",
        codDepartment: "BIO-DEP",
        passwordHash: "$2a$12$6OSKfeM73ZRKNbVdrtvFvuazBTYREUfaLAUuAA/W2hvqhmUlIExYe"
    }
]);

db.degree.insertMany([
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
    "s300001",
    "s300002",
    "s300003",
    "s300004",
    "s300005"
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

db.career.insertMany(careers);

const applications = [
    { "_id": "1", "proposalId": "1", "studentId": "s300001", "status": "PENDING" },
    { "_id": "2", "proposalId": "2", "studentId": "s300001", "status": "PENDING" },
    { "_id": "3", "proposalId": "3", "studentId": "s300001", "status": "PENDING" },
    { "_id": "4", "proposalId": "4", "studentId": "s300001", "status": "PENDING" },
    { "_id": "5", "proposalId": "5", "studentId": "s300001", "status": "PENDING" },
    { "_id": "6", "proposalId": "6", "studentId": "s300001", "status": "PENDING" },
    { "_id": "7", "proposalId": "7", "studentId": "s300002", "status": "PENDING" },
    { "_id": "8", "proposalId": "8", "studentId": "s300002", "status": "PENDING" },
    { "_id": "9", "proposalId": "9", "studentId": "s300002", "status": "PENDING" },
    { "_id": "10", "proposalId": "10", "studentId": "s300002", "status": "PENDING" },
    { "_id": "11", "proposalId": "1", "studentId": "s300002", "status": "PENDING" },
    { "_id": "12", "proposalId": "2", "studentId": "s300002", "status": "PENDING" },
    { "_id": "13", "proposalId": "3", "studentId": "s300003", "status": "PENDING" },
    { "_id": "14", "proposalId": "4", "studentId": "s300003", "status": "PENDING" },
    { "_id": "15", "proposalId": "5", "studentId": "s300003", "status": "PENDING" },
    { "_id": "16", "proposalId": "6", "studentId": "s300003", "status": "PENDING" },
    { "_id": "17", "proposalId": "7", "studentId": "s300003", "status": "PENDING" },
    { "_id": "18", "proposalId": "8", "studentId": "s300004", "status": "PENDING" },
    { "_id": "19", "proposalId": "9", "studentId": "s300004", "status": "PENDING" },
    { "_id": "20", "proposalId": "10", "studentId": "s300004", "status": "PENDING" },
]
db.appliedProposal.insertMany(applications)
