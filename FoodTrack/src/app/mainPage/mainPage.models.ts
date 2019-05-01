export interface Post {
  author: Author,
  foodUuid: string,
  pictureUrl: string,
  foodName: string,
  description: string,
  calories: number,
  eatenAt: number,
  mealTime: string, 
}

export interface Author {
  uuid: string;
}

export interface PostRequest {
  uuid?: string;
  foodName: string;
  description: string;
  calories: number;  
  
}


