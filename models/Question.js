const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        questionId: {
          type: Number,
          unique: true,
          default: 1,
        },
        question: {
          type: String,
          required: true,
          trim: true,
        },
        optionA: {
          type: String,
          required: true,
          trim: true,
        },
        optionB: {
          type: String,
          required: true,
          trim: true,
        },
        optionC: {
          type: String,
          required: true,
          trim: true,
        },
        optionD: {
          type: String,
          required: true,
          trim: true,
        },
        correctOption: {
          type: String,
          required: true,
          enum: ["A", "B", "C", "D"],
        },
        score: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Validasi untuk memastikan pilihan jawaban valid per soal
questionSchema.pre("validate", function (next) {
  // Hapus validasi duplikasi opsi
  next();
});

// Plugin Auto Increment untuk subdokumen
questionSchema.plugin(AutoIncrement, {
  inc_field: "questionId", // Field yang akan diincrement
  id: "question_seq", // Nama sequence
  start_seq: 1,
  reference_fields: ["code"], // Gunakan ini untuk membuat sequence per kode
});

module.exports = mongoose.model("Question", questionSchema);
