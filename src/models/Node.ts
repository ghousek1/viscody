export interface Node{
    id: string;
    
    data:any;
    position: any;
    sourcePosition?: any;
    targetPosition?: any;

    parentId: string|null;
    value:any;
    nestedElements:any[]

}