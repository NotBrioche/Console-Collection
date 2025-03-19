interface Command {
  name: string;
  description: string;
  syntax: string;

  longDescription?: string | undefined;
  execute(): void;
}

export default Command;
