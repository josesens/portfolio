/** Uma faixa da grade: calha, conteúdo, calha — separados por 1px do fundo da página. */
export function Row({
  children,
  hatch = false,
  top = false,
}: {
  children: React.ReactNode;
  hatch?: boolean;
  /** Faixa encostada no topo da viewport: arredonda só os cantos de baixo. */
  top?: boolean;
}) {
  const side = hatch ? "side side-hatch" : "side";
  return (
    <div className={top ? "row row-top" : "row"}>
      <div className={side} aria-hidden="true" />
      <div className="row-main">{children}</div>
      <div className={side} aria-hidden="true" />
    </div>
  );
}
