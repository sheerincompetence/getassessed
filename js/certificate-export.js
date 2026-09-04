(function () {
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = String(text || "").split(/\s+/);
    var line = "";
    var lines = [];
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    lines.forEach(function (l, idx) {
      ctx.fillText(l, x, y + idx * lineHeight);
    });
    return lines.length * lineHeight;
  }

  function drawCertificate(data) {
    var w = 1080;
    var h = 1350;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#2f3a42";
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    ctx.fillStyle = "#5c656e";
    ctx.font = "28px Helvetica, Arial, sans-serif";
    ctx.fillText("OFFICE OF CITIZEN YIELD", 70, 100);
    var protocol =
      data.protocol === "UNVERIFIED"
        ? "PROTOCOL: UNVERIFIED"
        : "ASSESSMENT PROTOCOL " + data.protocol;
    ctx.textAlign = "right";
    ctx.fillText(protocol, w - 70, 100);
    ctx.textAlign = "left";

    ctx.strokeStyle = "#c9ced3";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(70, 130);
    ctx.lineTo(w - 70, 130);
    ctx.stroke();

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.fillText("CERTIFICATE OF HUMAN UTILITY", 70, 180);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 42px Helvetica, Arial, sans-serif";
    ctx.fillText("HUMAN UTILITY ASSESSMENT", 70, 235);

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.fillText("Subject", 70, 300);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 44px Helvetica, Arial, sans-serif";
    ctx.fillText(data.subject, 70, 355);

    ctx.strokeStyle = "#2f3a42";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(70, 390);
    ctx.lineTo(w - 70, 390);
    ctx.stroke();

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HUMAN UTILITY PERCENTILE", w / 2, 450);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 180px Helvetica, Arial, sans-serif";
    ctx.fillText(data.percentile + "%", w / 2, 620);
    ctx.fillStyle = "#5c656e";
    ctx.font = "28px Helvetica, Arial, sans-serif";
    var jet = data.jettison
      ? "Jettison order #" + data.jettison.rank + " of " + data.jettison.of
      : "Jettison order not stated";
    ctx.fillText(jet, w / 2, 670);

    ctx.strokeStyle = "#2f3a42";
    ctx.beginPath();
    ctx.moveTo(70, 710);
    ctx.lineTo(w - 70, 710);
    ctx.stroke();

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.fillText("CLASSIFICATION", w / 2, 760);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 48px Helvetica, Arial, sans-serif";
    ctx.fillText(data.classification, w / 2, 820);
    ctx.textAlign = "left";

    function row(label, value, y) {
      ctx.fillStyle = "#eef0f2";
      ctx.fillRect(70, y, 140, 70);
      ctx.strokeStyle = "#c9ced3";
      ctx.strokeRect(70, y, w - 140, 70);
      ctx.strokeRect(70, y, 140, 70);
      ctx.fillStyle = "#5c656e";
      ctx.font = "bold 22px Helvetica, Arial, sans-serif";
      ctx.fillText(label, 90, y + 44);
      ctx.fillStyle = "#1f2428";
      ctx.font = "28px Helvetica, Arial, sans-serif";
      wrapText(ctx, value, 230, y + 44, w - 320, 30);
    }
    row("PRO", data.value01, 860);
    row("PRO", data.value02, 940);
    row("CON", data.hazard, 1020);

    var stamp = data.retention || "DISPOSABLE";
    var retain = stamp === "RETENTION RECOMMENDED";
    ctx.save();
    ctx.translate(w / 2, 1180);
    ctx.rotate((-5 * Math.PI) / 180);
    ctx.strokeStyle = retain ? "#1d4f5f" : "#6b2a2a";
    ctx.fillStyle = retain ? "#1d4f5f" : "#6b2a2a";
    ctx.lineWidth = 6;
    ctx.strokeRect(-260, -40, 520, 80);
    ctx.font = "bold 32px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(stamp, 0, 12);
    ctx.restore();

    ctx.textAlign = "left";
    ctx.fillStyle = "#5c656e";
    ctx.font = "22px Helvetica, Arial, sans-serif";
    wrapText(
      ctx,
      '"Disposable" does not mean you will be disposed of — only that you are not recommended for retention. Top 3% only.',
      70,
      1285,
      w - 140,
      28
    );

    return canvas;
  }

  function downloadPng(data) {
    var canvas = drawCertificate(data);
    var a = document.createElement("a");
    a.download = "human-utility-certificate.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  window.HUACertExport = { drawCertificate: drawCertificate, downloadPng: downloadPng };
})();
