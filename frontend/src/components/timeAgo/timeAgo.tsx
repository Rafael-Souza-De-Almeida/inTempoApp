import { formatDistanceToNow, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export function TimeAgo({ created_at }: { created_at?: string }) {
  if (!created_at) return null; // Evita erro ao renderizar antes dos dados carregarem

  const date = new Date(created_at);
  if (!isValid(date))
    return <p className="text-sm text-slate-500">Data inválida</p>;

  const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: ptBR });

  return <p className="text-sm text-slate-500">Postado {timeAgo}</p>;
}
