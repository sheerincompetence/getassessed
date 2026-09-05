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

  function loadLogo() {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        resolve(null);
      };
      img.src = "/assets/logo-mark.png";
    });
  }

  function drawX(ctx, cx, cy, size, color) {
    var half = size / 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(cx - half, cy - half);
    ctx.lineTo(cx + half, cy + half);
    ctx.moveTo(cx + half, cy - half);
    ctx.lineTo(cx - half, cy + half);
    ctx.stroke();
  }

  function drawCertificate(data, logo) {
    var w = 1080;
    var h = 1480;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#2f3a42";
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    var protocol =
      data.protocol === "UNVERIFIED"
        ? "PROTOCOL: UNVERIFIED"
        : "ASSESSMENT PROTOCOL " + data.protocol;

    if (logo) {
      ctx.drawImage(logo, 70, 72, 92, 70);
    }
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 36px Helvetica, Arial, sans-serif";
    ctx.fillText("OFFICE OF CITIZEN YIELD", logo ? 180 : 70, 118);
    ctx.fillStyle = "#5c656e";
    ctx.font = "20px Helvetica, Arial, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(protocol, w - 70, 100);
    ctx.font = "20px Helvetica, Arial, sans-serif";
    ctx.fillText("getassessed.org", w - 70, 128);
    ctx.textAlign = "left";

    ctx.strokeStyle = "#c9ced3";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(70, 160);
    ctx.lineTo(w - 70, 160);
    ctx.stroke();

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.fillText("CERTIFICATE OF HUMAN UTILITY", 70, 210);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 42px Helvetica, Arial, sans-serif";
    ctx.fillText("HUMAN UTILITY ASSESSMENT", 70, 265);

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.fillText("Subject", 70, 330);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 44px Helvetica, Arial, sans-serif";
    ctx.fillText(data.subject, 70, 385);

    ctx.strokeStyle = "#2f3a42";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(70, 420);
    ctx.lineTo(w - 70, 420);
    ctx.stroke();

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HUMAN UTILITY PERCENTILE", w / 2, 480);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 180px Helvetica, Arial, sans-serif";
    ctx.fillText(data.percentile + "%", w / 2, 650);
    ctx.fillStyle = "#5c656e";
    ctx.font = "28px Helvetica, Arial, sans-serif";
    var jet = data.jettison
      ? "Jettison order #" + data.jettison.rank + " of " + data.jettison.of
      : "Jettison order not stated";
    ctx.fillText(jet, w / 2, 700);

    ctx.strokeStyle = "#2f3a42";
    ctx.beginPath();
    ctx.moveTo(70, 740);
    ctx.lineTo(w - 70, 740);
    ctx.stroke();
    ctx.textAlign = "left";

    ctx.fillStyle = "#5c656e";
    ctx.font = "24px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CLASSIFICATION", w / 2, 790);
    ctx.fillStyle = "#1f2428";
    ctx.font = "bold 44px Helvetica, Arial, sans-serif";
    wrapText(ctx, data.classification, w / 2, 840, w - 160, 48);
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
    row("PRO", data.value01, 920);
    row("PRO", data.value02, 1000);
    row("CON", data.hazard, 1080);

    var bandY = 1220;
    var bandH = 270;

    ctx.strokeStyle = "#a8ac9c";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(70, bandY);
    ctx.lineTo(w - 70, bandY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#6e7264";
    ctx.font = "18px Courier New, monospace";
    ctx.fillText("OCY / INT / RET-01", 70, bandY + 32);
    ctx.fillStyle = "#3a3c34";
    ctx.textAlign = "right";
    ctx.fillText("For official use only", w - 70, bandY + 32);
    ctx.textAlign = "left";

    var retain = data.retention === "RETENTION RECOMMENDED";
    var formY = bandY + 52;
    var formH = 88;
    ctx.fillStyle = "#f4f3ee";
    ctx.fillRect(70, formY, w - 140, formH);
    ctx.strokeStyle = "#a8ac9c";
    ctx.lineWidth = 1;
    ctx.strokeRect(70, formY, w - 140, formH);
    ctx.beginPath();
    ctx.moveTo(400, formY);
    ctx.lineTo(400, formY + formH);
    ctx.moveTo(720, formY);
    ctx.lineTo(720, formY + formH);
    ctx.stroke();

    ctx.fillStyle = "#3a3c34";
    ctx.font = "22px Courier New, monospace";
    ctx.fillText("Retention decision", 85, formY + 52);

    function checkCell(x, label, marked) {
      var box = 22;
      var bx = x + 28;
      var by = formY + 33;
      ctx.strokeStyle = "#3a3c34";
      ctx.lineWidth = 1.5;
      ctx.fillStyle = "#fff";
      ctx.fillRect(bx, by, box, box);
      ctx.strokeRect(bx, by, box, box);
      if (marked) drawX(ctx, bx + box / 2, by + box / 2, 14, "#8a1510");
      ctx.fillStyle = "#3a3c34";
      ctx.font = "18px Courier New, monospace";
      ctx.fillText(label, bx + box + 12, by + 17);
    }
    checkCell(400, "Retain", retain);
    checkCell(720, "Disposable*", !retain);

    ctx.fillStyle = "#6e7264";
    ctx.font = "16px Courier New, monospace";
    wrapText(
      ctx,
      '* "Disposable" does not mean you will be disposed of, merely that you are not recommended for retention.',
      70,
      formY + formH + 28,
      w - 160,
      18
    );

    return canvas;
  }

  function downloadPng(data) {
    loadLogo().then(function (logo) {
      var canvas = drawCertificate(data, logo);
      var a = document.createElement("a");
      a.download = "human-utility-certificate.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    });
  }

  window.HUACertExport = { drawCertificate: drawCertificate, downloadPng: downloadPng };
})();
