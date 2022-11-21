export class CreateTaskDto {
  public title: string;
  public description: string;
  public category: string;
  public price?: string;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tegs?: string[];
}
