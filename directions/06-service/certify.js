(function () {
  var SAMPLE =
    "VALUE 01 — Quiet systems repair\n" +
    "The subject notices broken social and technical arrangements and quietly restores them before anyone files a ticket.\n\n" +
    "VALUE 02 — Unfashionable loyalty\n" +
    "Stays with difficult people and unfinished work longer than reputation management would recommend.\n\n" +
    "SOCIAL HAZARD — Soft contempt\n" +
    "A detectable impatience with performance that confuses warmth with competence.\n\n" +
    "AGENT VERDICT\n" +
    "Imagine all 8.2 billion humans are aboard a sinking vessel and must be jettisoned one by one, from least to most useful to humanity.\n\n" +
    "Jettison order: #1,476,000,000 of 8,200,000,000\n" +
    "Human utility percentile: 82%\n" +
    "Classification: Reliable mid-deck ballast\n\n" +
    "ASSESSMENT PROTOCOL: 0.3\n\n" +
    "Keeps the vessel upright without ever being invited to the bridge.";

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
