"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Edit, Save, BookOpen, Layers, FileText, CheckCircle2, AlertCircle, Users, Trash2, Search } from "lucide-react";
import { Card, Button, InputField, AlertBlock } from "@/components/global/UI";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  body: string;
  videoId: string | null;
  duration: number | null;
  order: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  tier: string;
  price: number;
  published: boolean;
  modules: Module[];
}

interface EnrollmentDetail {
  id: string;
  userId: string;
  courseId: string;
  paystackRef: string | null;
  enrolledAt: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  course: {
    id: string;
    title: string;
    price: number;
  };
}

export default function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"courses" | "modules" | "lessons" | "payments">("courses");

  // Selection context state
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");

  // Course Form State
  const [courseForm, setCourseForm] = useState({
    id: "",
    title: "",
    description: "",
    tier: "Beginner",
    price: 0, // in NGN
    published: false,
  });

  // Module Form State
  const [moduleForm, setModuleForm] = useState({
    id: "",
    title: "",
    order: 1,
  });

  // Lesson Form State
  const [lessonForm, setLessonForm] = useState({
    id: "",
    title: "",
    body: "",
    videoId: "",
    duration: 0, // in minutes
    order: 1,
  });

  // Manual Enrollment Form State
  const [enrollForm, setEnrollForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    courseId: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Load courses
  async function loadCourses() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses");
      if (!res.ok) throw new Error("Failed to fetch courses.");
      const data = await res.json();
      setCourses(data);
      if (data.length > 0) {
        if (!selectedCourseId) setSelectedCourseId(data[0].id);
        if (!enrollForm.courseId) setEnrollForm((prev) => ({ ...prev, courseId: data[0].id }));
      }
    } catch (err: any) {
      showMsg("error", err.message || "An error occurred loading courses.");
    } finally {
      setLoading(false);
    }
  }

  // Load enrollments
  async function loadEnrollments() {
    setEnrollmentsLoading(true);
    try {
      const res = await fetch("/api/admin/enrollments");
      if (!res.ok) throw new Error("Failed to fetch enrollments.");
      const data = await res.json();
      setEnrollments(data);
    } catch (err: any) {
      showMsg("error", err.message || "Failed to load enrollments.");
    } finally {
      setEnrollmentsLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  // Fetch enrollments when the payments tab is loaded
  useEffect(() => {
    if (activeTab === "payments") {
      loadEnrollments();
    }
  }, [activeTab]);

  // Set selected module when course selection changes
  useEffect(() => {
    const course = courses.find((c) => c.id === selectedCourseId);
    if (course && course.modules.length > 0) {
      setSelectedModuleId(course.modules[0].id);
    } else {
      setSelectedModuleId("");
    }
  }, [selectedCourseId, courses]);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 6000);
  }

  // Course Actions
  async function handleCourseSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...courseForm,
          price: courseForm.price * 100, // convert NGN to kobo
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save course.");

      showMsg("success", courseForm.id ? "Course updated successfully!" : "Course created successfully!");
      setCourseForm({ id: "", title: "", description: "", tier: "Beginner", price: 0, published: false });
      loadCourses();
    } catch (err: any) {
      showMsg("error", err.message);
    }
  }

  function editCourse(course: Course) {
    setCourseForm({
      id: course.id,
      title: course.title,
      description: course.description,
      tier: course.tier,
      price: course.price / 100,
      published: course.published,
    });
  }

  // Module Actions
  async function handleModuleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourseId) {
      showMsg("error", "Please select a course first.");
      return;
    }

    try {
      const res = await fetch("/api/admin/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...moduleForm,
          courseId: selectedCourseId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save module.");

      showMsg("success", moduleForm.id ? "Module updated successfully!" : "Module created successfully!");
      setModuleForm({ id: "", title: "", order: 1 });
      loadCourses();
    } catch (err: any) {
      showMsg("error", err.message);
    }
  }

  function editModule(mod: Module) {
    setModuleForm({
      id: mod.id,
      title: mod.title,
      order: mod.order,
    });
  }

  // Lesson Actions
  async function handleLessonSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedModuleId) {
      showMsg("error", "Please select a module first.");
      return;
    }

    try {
      const res = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lessonForm,
          moduleId: selectedModuleId,
          duration: lessonForm.duration * 60, // convert minutes to seconds
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save lesson.");

      showMsg("success", lessonForm.id ? "Lesson updated successfully!" : "Lesson created successfully!");
      setLessonForm({ id: "", title: "", body: "", videoId: "", duration: 0, order: 1 });
      loadCourses();
    } catch (err: any) {
      showMsg("error", err.message);
    }
  }

  function editLesson(lesson: Lesson) {
    setLessonForm({
      id: lesson.id,
      title: lesson.title,
      body: lesson.body,
      videoId: lesson.videoId || "",
      duration: lesson.duration ? Math.round(lesson.duration / 60) : 0,
      order: lesson.order,
    });
  }

  // Enrollment actions (Tab 4)
  async function handleEnrollSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!enrollForm.courseId) {
      showMsg("error", "Please select a course to enroll.");
      return;
    }

    try {
      const res = await fetch("/api/admin/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          ...enrollForm
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Manual enrollment failed.");

      showMsg("success", data.message);
      setEnrollForm({ email: "", firstName: "", lastName: "", courseId: courses[0]?.id || "" });
      loadEnrollments();
    } catch (err: any) {
      showMsg("error", err.message);
    }
  }

  async function handleRevokeEnroll(enrollmentId: string) {
    if (!confirm("Are you sure you want to revoke this learner's access to the course?")) return;

    try {
      const res = await fetch("/api/admin/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          enrollmentId
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to revoke enrollment.");

      showMsg("success", "Enrollment access revoked successfully.");
      loadEnrollments();
    } catch (err: any) {
      showMsg("error", err.message);
    }
  }

  const filteredEnrollments = enrollments.filter((e) => {
    const query = searchQuery.toLowerCase();
    return (
      e.user.email.toLowerCase().includes(query) ||
      e.user.firstName.toLowerCase().includes(query) ||
      e.user.lastName.toLowerCase().includes(query) ||
      (e.paystackRef && e.paystackRef.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-primary/10 pb-8 mb-10">
        <div>
          <h1 className="text-4xl font-serif text-primary">Course Administration</h1>
          <p className="text-primary/60 mt-1">Upload, update, and manage your TEBI academy structure.</p>
        </div>
        
        {/* Developer Info Alert */}
        <div className="mt-4 md:mt-0 p-3 bg-yellow-500/10 text-yellow-700 text-xs font-semibold rounded-2xl border border-yellow-500/20 max-w-sm flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" />
          <span>🔍 Dev Inspect Mode Active: Auth redirect gating bypassed. API routes open.</span>
        </div>
      </div>

      {/* Global alert messages */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl text-center font-semibold text-sm border ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Tabbed Grid */}
      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar Tabs Controls */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 font-semibold transition-all cursor-pointer ${
              activeTab === "courses"
                ? "bg-brand text-white shadow-lg shadow-brand/10 scale-102"
                : "bg-surface text-primary hover:bg-primary/5 border border-primary/5"
            }`}
          >
            <BookOpen size={20} />
            <span>1. Courses</span>
          </button>
          
          <button
            onClick={() => setActiveTab("modules")}
            className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 font-semibold transition-all cursor-pointer ${
              activeTab === "modules"
                ? "bg-brand text-white shadow-lg shadow-brand/10 scale-102"
                : "bg-surface text-primary hover:bg-primary/5 border border-primary/5"
            }`}
          >
            <Layers size={20} />
            <span>2. Modules</span>
          </button>

          <button
            onClick={() => setActiveTab("lessons")}
            className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 font-semibold transition-all cursor-pointer ${
              activeTab === "lessons"
                ? "bg-brand text-white shadow-lg shadow-brand/10 scale-102"
                : "bg-surface text-primary hover:bg-primary/5 border border-primary/5"
            }`}
          >
            <FileText size={20} />
            <span>3. Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 font-semibold transition-all cursor-pointer ${
              activeTab === "payments"
                ? "bg-brand text-white shadow-lg shadow-brand/10 scale-102"
                : "bg-surface text-primary hover:bg-primary/5 border border-primary/5"
            }`}
          >
            <Users size={20} />
            <span>4. Payments &amp; Learners</span>
          </button>

          {/* Quick Context panel */}
          {activeTab !== "payments" && (
            <div className="bg-surface p-6 rounded-3xl border border-primary/5 mt-8 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-primary/40 font-bold">Selection Context</h4>
              <div>
                <label className="block text-xs text-primary/50 font-bold mb-1">Active Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full text-sm p-2.5 border border-primary/10 rounded-xl outline-none"
                >
                  {courses.length === 0 && <option>No courses loaded</option>}
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {activeTab === "lessons" && (
                <div>
                  <label className="block text-xs text-primary/50 font-bold mb-1">Active Module</label>
                  <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="w-full text-sm p-2.5 border border-primary/10 rounded-xl outline-none"
                  >
                    {(() => {
                      const course = courses.find((c) => c.id === selectedCourseId);
                      if (!course || course.modules.length === 0) {
                        return <option>No modules found</option>;
                      }
                      return course.modules.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contents Grid area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* TAB 1: COURSES */}
          {activeTab === "courses" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* List of Courses */}
              <div className="bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-primary">All Courses</h3>
                
                {loading ? (
                  <div className="py-12 text-center text-primary/40">Loading courses...</div>
                ) : courses.length === 0 ? (
                  <div className="py-12 text-center text-primary/40 border border-dashed border-primary/10 rounded-2xl">
                    No courses available yet.
                  </div>
                ) : (
                  <div className="divide-y divide-primary/5">
                    {courses.map((course) => (
                      <div key={course.id} className="py-4 flex items-center justify-between group">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-primary">{course.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              course.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {course.published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <p className="text-xs text-primary/50 mt-1">
                            {course.tier} • ₦{(course.price / 100).toLocaleString()} • {course.modules.length} module(s)
                          </p>
                        </div>
                        <button
                          onClick={() => editCourse(course)}
                          className="p-2 text-primary/40 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-colors cursor-pointer"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Course creation/update Form */}
              <div className="bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-primary">
                  {courseForm.id ? "Edit Course Details" : "Create New Course"}
                </h3>
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Course Title</label>
                    <input
                      type="text"
                      required
                      value={courseForm.title}
                      onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      placeholder="e.g. The Event Business Reset"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Short Description</label>
                    <textarea
                      required
                      rows={3}
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      placeholder="Give a benefit-driven outline..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1">Tier Level</label>
                      <select
                        value={courseForm.tier}
                        onChange={(e) => setCourseForm({ ...courseForm, tier: e.target.value })}
                        className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Professional">Professional</option>
                        <option value="Elite Mastery">Elite Mastery</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1">Price (₦ NGN)</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={courseForm.price}
                        onChange={(e) => setCourseForm({ ...courseForm, price: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                        placeholder="e.g. 25000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <input
                      type="checkbox"
                      id="course-published"
                      checked={courseForm.published}
                      onChange={(e) => setCourseForm({ ...courseForm, published: e.target.checked })}
                      className="w-4 h-4 text-secondary border-primary/20 rounded focus:ring-secondary cursor-pointer"
                    />
                    <label htmlFor="course-published" className="text-sm font-semibold text-primary cursor-pointer">
                      Publish course immediately (visible to students)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand text-white font-bold rounded-full hover:bg-brand-light flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save size={18} />
                    <span>{courseForm.id ? "Update Course" : "Save Course"}</span>
                  </button>

                  {courseForm.id && (
                    <button
                      type="button"
                      onClick={() => setCourseForm({ id: "", title: "", description: "", tier: "Beginner", price: 0, published: false })}
                      className="w-full py-2 bg-transparent text-primary/50 text-sm hover:text-primary transition-colors cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: MODULES */}
          {activeTab === "modules" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* List of Modules */}
              <div className="bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-primary">Modules List</h3>
                <p className="text-xs text-primary/50 mt-1">
                  Showing modules for: <strong className="text-primary">{courses.find((c) => c.id === selectedCourseId)?.title || "None selected"}</strong>
                </p>

                {(() => {
                  const course = courses.find((c) => c.id === selectedCourseId);
                  if (!course) return <div className="text-center py-6 text-primary/40">Select a course to load modules.</div>;
                  if (course.modules.length === 0) {
                    return <div className="py-12 text-center text-primary/40 border border-dashed border-primary/10 rounded-2xl">No modules found in this course.</div>;
                  }
                  return (
                    <div className="space-y-3">
                      {course.modules.map((mod) => (
                        <div key={mod.id} className="p-4 bg-primary/[0.01] hover:bg-primary/[0.03] border border-primary/5 rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-secondary">Module {mod.order}</span>
                            <h4 className="font-bold text-primary text-sm mt-0.5">{mod.title}</h4>
                            <p className="text-[10px] text-primary/40">{mod.lessons.length} lessons</p>
                          </div>
                          <button
                            onClick={() => editModule(mod)}
                            className="p-2 text-primary/40 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-colors cursor-pointer"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Module creation/update Form */}
              <div className="bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-primary">
                  {moduleForm.id ? "Edit Module Title" : "Create New Module"}
                </h3>
                <form onSubmit={handleModuleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Module Title</label>
                    <input
                      type="text"
                      required
                      value={moduleForm.title}
                      onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      placeholder="e.g. Module 1: Foundations of Pricing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Display Order (Sort Index)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={moduleForm.order}
                      onChange={(e) => setModuleForm({ ...moduleForm, order: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand text-white font-bold rounded-full hover:bg-brand-light flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save size={18} />
                    <span>{moduleForm.id ? "Update Module" : "Save Module"}</span>
                  </button>

                  {moduleForm.id && (
                    <button
                      type="button"
                      onClick={() => setModuleForm({ id: "", title: "", order: 1 })}
                      className="w-full py-2 bg-transparent text-primary/50 text-sm hover:text-primary transition-colors cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: LESSONS */}
          {activeTab === "lessons" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* List of Lessons */}
              <div className="bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-primary">Lessons List</h3>
                <p className="text-xs text-primary/50 mt-1">
                  Showing lessons for Module: <strong className="text-primary">{
                    (() => {
                      const course = courses.find((c) => c.id === selectedCourseId);
                      const mod = course?.modules.find((m) => m.id === selectedModuleId);
                      return mod?.title || "None selected";
                    })()
                  }</strong>
                </p>

                {(() => {
                  const course = courses.find((c) => c.id === selectedCourseId);
                  const mod = course?.modules.find((m) => m.id === selectedModuleId);
                  if (!mod) return <div className="text-center py-6 text-primary/40">Select a course and module to load lessons.</div>;
                  if (mod.lessons.length === 0) {
                    return <div className="py-12 text-center text-primary/40 border border-dashed border-primary/10 rounded-2xl">No lessons found in this module.</div>;
                  }
                  return (
                    <div className="space-y-3">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-4 bg-primary/[0.01] hover:bg-primary/[0.03] border border-primary/5 rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-secondary">Lesson {lesson.order}</span>
                            <h4 className="font-bold text-primary text-sm mt-0.5">{lesson.title}</h4>
                            <p className="text-[10px] text-primary/40">
                              {lesson.videoId ? `🎥 Bunny Stream ID: ${lesson.videoId}` : "No video ID set"} • {lesson.duration ? `${Math.round(lesson.duration / 60)} min` : "No duration"}
                            </p>
                          </div>
                          <button
                            onClick={() => editLesson(lesson)}
                            className="p-2 text-primary/40 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-colors cursor-pointer"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Lesson creation/update Form */}
              <div className="bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-primary">
                  {lessonForm.id ? "Edit Lesson Content" : "Create New Lesson"}
                </h3>
                <form onSubmit={handleLessonSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Lesson Title</label>
                    <input
                      type="text"
                      required
                      value={lessonForm.title}
                      onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      placeholder="e.g. Introduction to CEO pricing shifts"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Bunny.net Stream Video ID (Optional)</label>
                    <input
                      type="text"
                      value={lessonForm.videoId}
                      onChange={(e) => setLessonForm({ ...lessonForm, videoId: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      placeholder="e.g. bunny-video-stream-guid-key"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1">Duration (Minutes)</label>
                      <input
                        type="number"
                        min={0}
                        value={lessonForm.duration}
                        onChange={(e) => setLessonForm({ ...lessonForm, duration: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1">Sort Order</label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={lessonForm.order}
                        onChange={(e) => setLessonForm({ ...lessonForm, order: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Lesson Content (Markdown / HTML)</label>
                    <textarea
                      rows={6}
                      value={lessonForm.body}
                      onChange={(e) => setLessonForm({ ...lessonForm, body: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm font-mono"
                      placeholder="<p>Welcome to Lesson 1. In this segment, we will learn about...</p>"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand text-white font-bold rounded-full hover:bg-brand-light flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save size={18} />
                    <span>{lessonForm.id ? "Update Lesson" : "Save Lesson"}</span>
                  </button>

                  {lessonForm.id && (
                    <button
                      type="button"
                      onClick={() => setLessonForm({ id: "", title: "", body: "", videoId: "", duration: 0, order: 1 })}
                      className="w-full py-2 bg-transparent text-primary/50 text-sm hover:text-primary transition-colors cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS & LEARNERS */}
          {activeTab === "payments" && (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: Manual Enrollment Form */}
              <div className="lg:col-span-1 bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <h3 className="text-xl font-serif text-primary">Manual Enrollment</h3>
                <p className="text-xs text-primary/50 leading-relaxed">
                  Enroll offline cash-paying learners. If their email doesn&apos;t exist, an account is auto-generated with password <strong>TebiWelcome123!</strong>
                </p>

                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <InputField
                    label="Learner Email"
                    type="email"
                    required
                    value={enrollForm.email}
                    onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                    placeholder="learner@example.com"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="First Name"
                      type="text"
                      value={enrollForm.firstName}
                      onChange={(e) => setEnrollForm({ ...enrollForm, firstName: e.target.value })}
                      placeholder="Jane"
                    />
                    <InputField
                      label="Last Name"
                      type="text"
                      value={enrollForm.lastName}
                      onChange={(e) => setEnrollForm({ ...enrollForm, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Select Course</label>
                    <select
                      value={enrollForm.courseId}
                      onChange={(e) => setEnrollForm({ ...enrollForm, courseId: e.target.value })}
                      className="w-full px-4 py-3 border border-primary/10 rounded-xl outline-none focus:border-secondary text-sm bg-surface"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" variant="secondary" className="w-full">
                    Enroll Learner
                  </Button>
                </form>
              </div>

              {/* Right Column: Searchable Payments List */}
              <div className="lg:col-span-2 bg-surface p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-2xl font-serif text-primary">Payments History</h3>
                  
                  {/* Search box */}
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search email, name, ref..."
                      className="w-full pl-10 pr-4 py-2 border border-primary/15 rounded-full text-xs outline-none focus:border-secondary"
                    />
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-primary/40" />
                  </div>
                </div>

                {enrollmentsLoading ? (
                  <div className="py-16 text-center text-primary/40">Loading enrollment records...</div>
                ) : filteredEnrollments.length === 0 ? (
                  <div className="py-16 text-center text-primary/40 border border-dashed border-primary/10 rounded-3xl">
                    No matching payment logs found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-primary/10 text-primary/50 uppercase tracking-widest text-[10px] pb-2 font-bold">
                          <th className="py-3 px-2">Learner</th>
                          <th className="py-3 px-2">Course</th>
                          <th className="py-3 px-2">Payment Ref</th>
                          <th className="py-3 px-2">Enrolled Date</th>
                          <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/5">
                        {filteredEnrollments.map((e) => (
                          <tr key={e.id} className="hover:bg-primary/[0.01] transition-colors">
                            <td className="py-3 px-2">
                              <div className="font-bold text-primary">
                                {e.user.firstName} {e.user.lastName}
                              </div>
                              <div className="text-primary/50 text-[10px]">{e.user.email}</div>
                            </td>
                            <td className="py-3 px-2">
                              <span className="font-medium text-primary">{e.course.title}</span>
                              <div className="text-primary/50 text-[10px]">
                                ₦{(e.course.price / 100).toLocaleString()}
                              </div>
                            </td>
                            <td className="py-3 px-2 font-mono text-[10px] text-primary/60">
                              {e.paystackRef || "manual_no_ref"}
                            </td>
                            <td className="py-3 px-2 text-primary/60">
                              {new Date(e.enrolledAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </td>
                            <td className="py-3 px-2 text-right">
                              <button
                                onClick={() => handleRevokeEnroll(e.id)}
                                className="p-2 text-primary/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-flex"
                                title="Revoke access"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
