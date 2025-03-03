import { MineralModel } from '../models/MineralModel';

class MineralService {
    constructor() {
        this.storageKey = 'minerals';
        this.minerals = this.loadMinerals();
    }

    loadMinerals() {
        const storedMinerals = localStorage.getItem(this.storageKey);
        if (!storedMinerals) return [];
        
        try {
            return JSON.parse(storedMinerals).map(mineral => MineralModel.fromJSON(mineral));
        } catch (error) {
            console.error('Error loading minerals:', error);
            return [];
        }
    }

    saveMinerals() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.minerals.map(mineral => mineral.toJSON())));
    }

    getAllMinerals() {
        return [...this.minerals];
    }

    getMineralById(id) {
        return this.minerals.find(mineral => mineral.id === id) || null;
    }

    addMineral(mineralData) {
        const newMineral = new MineralModel(mineralData);
        this.minerals.push(newMineral);
        this.saveMinerals();
        return newMineral;
    }

    updateMineral(id, updatedData) {
        const index = this.minerals.findIndex(mineral => mineral.id === id);
        if (index === -1) return null;

        // Preserve the ID
        updatedData.id = id;
        
        const updatedMineral = new MineralModel(updatedData);
        this.minerals[index] = updatedMineral;
        this.saveMinerals();
        return updatedMineral;
    }

    deleteMineral(id) {
        const index = this.minerals.findIndex(mineral => mineral.id === id);
        if (index === -1) return false;

        this.minerals.splice(index, 1);
        this.saveMinerals();
        return true;
    }
}

// Singleton instance
const mineralService = new MineralService();
export default mineralService;