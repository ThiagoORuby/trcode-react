export type FileItem = {
  name: string;
  path: string;
  handle: FileSystemHandle;
  type: "file" | "directory";
  children: FileItem[];
};
