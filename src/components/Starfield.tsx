import { generateStarShadow } from "@/lib/stars";

// Classic pure-CSS starfield: three layers of tiny dots (via box-shadow)
// drifting and twinkling at different speeds for a soft parallax effect.
// No client-side JS or hooks needed — the star positions are deterministic.
export default function Starfield() {
  const small = generateStarShadow(500, 11, 2000);
  const medium = generateStarShadow(150, 22, 2000);
  const large = generateStarShadow(60, 33, 2000);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(ellipse_at_top,_#141432,_#05050f_70%)]">
      <div
        className="stars-layer stars-small"
        style={{ width: 1, height: 1, boxShadow: small }}
      />
      <div
        className="stars-layer stars-medium"
        style={{ width: 2, height: 2, boxShadow: medium }}
      />
      <div
        className="stars-layer stars-large"
        style={{ width: 2, height: 2, boxShadow: large }}
      />
    </div>
  );
}
