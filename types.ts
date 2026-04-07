export interface Project {
  id: string;
  name: string;
}


export interface Record {
  id: string;
  projectId: string;
  temperature: number;
  latitude: number;
  longitude: number;
  voltage: number;
  timestamp: string;
}
