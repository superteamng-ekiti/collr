/**
 * Represents a social media engagement task
 * @property {number} id - Unique identifier for the task
 * @property {'X' | 'TikTok' | 'Instagram'} type - Platform type
 * @property {number} reward - Amount of COLLR tokens for reward
 */
export interface ITask {
    id: number;
    type: 'X' | 'TikTok' | 'Instagram';
    title: string;
    creator: { 
        name: string;
        isVerified: boolean;
    };
    due: string;
    participants: string;
    reward: number;
    currency: string;
};
