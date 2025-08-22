//댓글
export type Comment = {  
  id: string;     //c1,c2,..
  author: string;
  text: string;
  date: string; 
};

//게시글
export type Post = {
  id: string;               //p1,p2,..
  purchaseType: boolean;    // 공동구매(true)
  purchaseStatus: boolean;  // 공동구매 상태: 진행중(True)
  region: string;           // 구역
  title: string;    
  author: string;     
  date: string;      
  contents: string
  image?: string;    
  views: number;             //조회수
  comments: Comment[];
};
