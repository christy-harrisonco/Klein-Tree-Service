export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
