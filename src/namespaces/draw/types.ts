export interface SocketDraw {
  x: number;
  y: number;
  px: number;
  py: number;
  color: string;
  strokeWidth: number;
}

export interface User {
  id: string;
  color: string;
  name?: string;
}
