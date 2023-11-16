class Proposal {
    id: string | null;
    title: string;
    supervisor: string;
    coSupervisors: string[];
    keywords: string[];
    type: string;
    groups: string[];
    description: string;
    requiredKnowledge: string;
    notes: string;
    expiration: Date;
    level: string;
    cdS: string[];
    archived: boolean;

    constructor(id: string | null, title: string, supervisor: string, coSupervisors: string[], keywords: string[], type: string, groups: string[], description: string, requiredKnowledge: string, notes: string, expiration: Date, level: string, cdS: string[], archived: boolean) {
        this.id = id;
        this.title = title;
        this.supervisor = supervisor;
        this.coSupervisors = coSupervisors;
        this.keywords = keywords;
        this.type = type;
        this.groups = groups;
        this.description = description;
        this.requiredKnowledge = requiredKnowledge;
        this.notes = notes;
        this.expiration = expiration;
        this.level = level;
        this.cdS = cdS;
        this.archived = archived;
    }
}

export default Proposal
