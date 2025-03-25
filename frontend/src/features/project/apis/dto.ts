export type ProjectStatus =
  | "Open"
  | "In Progress"
  | "In Review"
  | "At Risk"
  | "Needs Revisions"
  | "Done"
  | "Canceled"
  | "Complete";

export type ProjectType = "Fixed" | "Hourly";
export type PriorityEnum = "Low" | "Medium" | "High" | "Critical";

export interface IProject {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  priority: PriorityEnum;
  timeEstimated: number;
  timeTracked: number;
  timeDifference: number;
  projectType: ProjectType;
  projectValue: number;
  status: ProjectStatus;
  // accountId
  // dealId
  // invoices
}

export interface ICreateProject {
  name: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  priority?: PriorityEnum;
  timeEstimated?: number;
  timeTracked?: number;
  projectType?: ProjectType;
  projectValue?: number;
  status?: ProjectStatus;
}

export interface IUpdateProject {
  id: string;
  name?: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  priority?: PriorityEnum;
  timeEstimated?: number;
  timeTracked?: number;
  projectType?: ProjectType;
  projectValue?: number;
  status?: ProjectStatus;
}

export interface IChangeProjectStatus {
  id: string;
  status: ProjectStatus;
}

export interface IProjectsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProject[];
}

export interface IProjectResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProject;
}
