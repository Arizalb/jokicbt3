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
          unique: false, // Ubah menjadi false
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
  inc_field: "questions.questionId",
  id: "question_seq",
  start_seq: 1,
  reference_fields: ["code"],
  disable_hooks: true, // Tambahkan ini untuk menonaktifkan hooks default
});

module.exports = mongoose.model("Question", questionSchema);
