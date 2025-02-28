import { formatDistanceToNow, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export function TimeAgo({ created_at }: { created_at?: string }) {
  if (!created_at) return null; // Evita erro ao renderizar antes dos dados carregarem

  const date = new Date(created_at);
  if (!isValid(date))
    return <p className="text-sm text-slate-500">Data inválida</p>;

  let timeAgo = formatDistanceToNow(date, { locale: ptBR });

  timeAgo = timeAgo.replace("cerca de ", "");

  return (
    <p className=" text-xs md:text-sm text-slate-500">Postado há {timeAgo}</p>
  );
}
