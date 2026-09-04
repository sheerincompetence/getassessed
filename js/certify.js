(function () {
  var SAMPLE =
    "VALUE 01 — MAKES CONFUSION OPERABLE\n" +
    "The subject detects the hidden structure inside muddled situations, names it, then constructs something people can act through. Frameworks, prototypes, workshops … he does not merely simplify complexity. He finds the part that is governing behaviour without admitting it.\n\n" +
    "VALUE 02 — BUILDS CULTURAL ANTIBODIES\n" +
    "The subject converts political, institutional and psychological failure into playable objects. TerrorBull Games, Riot Bingo and his team experiments let people encounter incentives and absurdities before discussing them. This is rarer than criticism. Humanity produces abundant denunciation; it produces fewer mechanisms through which people can catch themselves participating.\n\n" +
    "SOCIAL HAZARD — EXHAUSTIVE CORRECTION\n" +
    "The subject has difficulty leaving an imprecise claim alone. He interrogates wording, assumptions and implications beyond the point at which many people still find the exchange rewarding. Others may feel continually examined, corrected or recruited into a depth of analysis they did not request. Casual conversation can become unpaid systems work.\n\n" +
    "AGENT VERDICT\n" +
    "Jettison order: #7,491,000,000 of 8,200,000,000\n" +
    "Human utility percentile: 91.35%\n" +
    "Classification: Difficult but structurally useful\n" +
    "The subject is retained because sinking vessels need people who notice that the evacuation procedure is reproducing the leak.";

  function firstLine(match) {
    if (!match) return null;
    return match[1].replace(/\s+/g, " ").trim();
  }

  function parseAssessment(text) {
    var value01 = firstLine(text.match(/VALUE\s*0?1\s*[—–\-:]\s*(.+)/i));
    var value02 = firstLine(text.match(/VALUE\s*0?2\s*[—–\-:]\s*(.+)/i));
    var hazard = firstLine(text.match(/SOCIAL\s*HAZARD\s*[—–\-:]\s*(.+)/i));
    var classification = firstLine(text.match(/Classification\s*:\s*(.+)/i));
    var protocolMatch = text.match(/ASSESSMENT\s*PROTOCOL\s*:\s*([0-9.]+)/i);
    var protocol = protocolMatch ? protocolMatch[1] : "UNVERIFIED";

    var percentile = null;
    var pctMatch = text.match(/Human utility percentile\s*:\s*([0-9]+(?:\.[0-9]+)?)\s*%?/i);
    if (pctMatch) percentile = parseFloat(pctMatch[1]);

    var jettison = null;
    var jetMatch = text.match(/Jettison order\s*:\s*#?\s*([0-9,]+)\s*of\s*([0-9,]+)/i);
    if (jetMatch) {
      jettison = {
        rank: jetMatch[1],
        of: jetMatch[2]
      };
    }

    return {
      value01: value01,
      value02: value02,
      hazard: hazard,
      classification: classification,
      percentile: percentile,
      jettison: jettison,
      protocol: protocol
    };
  }

  function retentionFor(percentile) {
    if (percentile == null || isNaN(percentile)) return null;
    return percentile >= 97 ? "RETENTION RECOMMENDED" : "DISPOSABLE";
  }

  function subjectName(raw) {
    var name = (raw || "").trim();
    return name ? name : "SUBJECT: UNDISCLOSED";
  }

  window.HUACertify = {
    SAMPLE: SAMPLE,
    parseAssessment: parseAssessment,
    retentionFor: retentionFor,
    subjectName: subjectName,
    STORAGE_KEY: "hua-ocy-certificate-v1"
  };
})();
